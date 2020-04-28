import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {
  Button,
  Row,
  Table,
  Label,
  UncontrolledTooltip,
  UncontrolledCollapse,
  DropdownToggle,
  CardHeader,
  CardBody,
  UncontrolledAlert
} from 'reactstrap';
import classnames from 'classnames';
import {
  TextFormat,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import Select from 'react-select';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities, updateInteresseEntity, getEntitiesCSV, insertObservacao, prencherComarcas, editValorAcao, editMoeda} from './processo.reducer';
import {getProcessoState, getSortState, IProcessoBaseState} from './processo-utils';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, APP_LOCAL_DATETIME_FORMAT, currency} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {Panel, PanelHeader, PanelBody, PanelFooter} from 'app/shared/layout/panel/panel.tsx';
import {AvForm, AvInput} from 'availity-reactstrap-validation';
import './processo.scss';
import ModalObservacao from "app/entities/processo/processo-update-observacao";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EasyEdit, { Types } from "react-easy-edit";
import 'rc-slider/assets/index.css';
import 'react-datetime/css/react-datetime.css';
import {Estado} from "app/shared/model/enumerations/estado.sigla";
import pesquisa from "app/entities/pesquisa/pesquisa";
export interface IProcessoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}


export interface IProcessoState extends IProcessoBaseState, IPaginationBaseState {
}

class Processo extends React.Component<IProcessoProps, IProcessoState> {
  private myFormRef: any;


  constructor(props) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProcessoState(this.props.location),
      estado: props.match.params.estado,
      pesquisa: props.match.params.pesquisa
    };
    this.insertObservacao = this.insertObservacao.bind(this);
    this.editValorAcao = this.editValorAcao.bind(this);
    this.editMoeda= this.editMoeda.bind(this);
    this.changeFilterDistribuicaoInicial = this.changeFilterDistribuicaoInicial.bind(this);
    this.changeFilterDistribuicaoFinal = this.changeFilterDistribuicaoFinal.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      const _pesquisa = this.state.pesquisa;
      this.setState({activeTab: tab, pesquisa: _pesquisa}, () => this.sortEntities());
    }
  }

  filterEntity = (event, errors, values) => {
    this.setState({
      ...this.state,
      ...values
    }, () => this.sortEntities());
  };
  componentDidUpdate = (prevProps) => {
    if (this.props.match.params['estado'] !== prevProps.match.params['estado']) {
      this.setState({estado: this.props.match.params['estado']},
        () => {
          this.componentDidMount();
        }
      );
    }
    if (this.props.match.params['pesquisa'] !== prevProps.match.params['pesquisa']) {
      this.setState({pesquisa: this.props.match.params['pesquisa']},
        () => {
          this.componentDidMount();
        }
      );
    }
  };

  componentDidMount() {
    console.info(this.state);
    this.getEntities();
    let idEstado = this.state.estado == "SC" ? 1 : 2;
    this.props.prencherComarcas(idEstado);
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

  sortIcon = (field) => {
    if(this.state.sort === field){
      if(this.state.order === 'asc'){
        return 'sort-up';
      }
      return 'sort-down';
    }
    return 'sort';
  };
  changeFilterDistribuicaoInicial = (value) => {
    this.setState({distribuicaoInicial: value});
  };
  changeFilterDistribuicaoFinal = (value) => {
    this.setState({distribuicaoFinal: value});
  };
  saveInteresse = (id, interesse) => {
    const {estado, activePage, itemsPerPage, sort, order, activeTab, comarca, advogados, pesquisa, numeroProcesso, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda} = this.state;
    const filters = [estado, activePage - 1, itemsPerPage, `${sort},${order}`, activeTab, comarca, numeroProcesso, advogados,  pesquisa, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda];
    this.props.updateInteresseEntity(id, interesse, filters);
  };


  cancelCourse = () => {
    this.setState(
      {distribuicaoInicial: null, distribuicaoFinal: null, comarca: '', numeroProcesso: '', assunto: '', valorInicial: null, valorFinal: null},
      () => this.sortEntities()
    );
  };

  insertObservacao = (event, errors, values, id) => {
    const {estado, activePage, itemsPerPage, sort, order, activeTab, comarca, advogados, pesquisa, numeroProcesso, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda} = this.state;
    const filters = [estado, activePage - 1, itemsPerPage, `${sort},${order}`, activeTab, comarca, numeroProcesso, advogados,  pesquisa, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda];

    this.props.insertObservacao(id, values.observacao, filters);
  };

  editValorAcao = (id, valor) => {
    const {estado, activePage, itemsPerPage, sort, order, activeTab, comarca, advogados, pesquisa, numeroProcesso, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda} = this.state;
    const filters = [estado, activePage - 1, itemsPerPage, `${sort},${order}`, activeTab, comarca, numeroProcesso, advogados,  pesquisa, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda];

    this.props.editValorAcao (id, valor, filters);
  };

  editMoeda = (id, moeda) => {
  const {estado, activePage, itemsPerPage, sort, order, activeTab, comarca, advogados, pesquisa, numeroProcesso, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal} = this.state;
  const filters = [estado, activePage - 1, itemsPerPage, `${sort},${order}`, activeTab, comarca, numeroProcesso, advogados,  pesquisa, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal];

  this.props.editMoeda (id, moeda, filters);
};

  sortEntities() {
    this.getEntities();

    this.props.history.push(this.props.location.pathname +'?' +this.getFiltersURL());

  }
  getFiltersURL = (offset = null) => {
    const advogados = parseInt(this.state.advogados, 10);
    return 'page=' + this.state.activePage + '&' +
    'sort=' + this.state.sort + ',' + this.state.order + '&' +
    'activeTab=' + this.state.activeTab + '&' +
    (offset !== null ? ('offset=' + offset) + '&' : '') +
    (advogados !== 0 && advogados !== 1 ? '' : ('advogados=' + (advogados === 1 ? 1 : 0) + '&')) +
    'pesquisa=' + this.state.pesquisa + '&' +
    'comarca=' + this.state.comarca + '&' +
    'numeroProcesso=' + this.state.numeroProcesso + '&' +
    'assunto=' + this.state.assunto + '&' +
    'distribuicaoInicial=' + (this.state.distribuicaoInicial ? this.state.distribuicaoInicial.toDateString() : '') + '&' +
    'distribuicaoFinal=' + (this.state.distribuicaoFinal ? this.state.distribuicaoFinal.toDateString() : '') + '&' +
    'valorInicial=' + this.state.valorInicial + '&' +
    'valorFinal=' + this.state.valorFinal + '&' +
    'moeda=' + this.state.moeda + '&' +
    ''

  };

  selectComarcaChange = (value) => {
    this.setState({ comarca: value.value});

  };

  handlePagination = activePage => this.setState({activePage}, () => this.sortEntities());

  getEntities = () => {
    const {estado, activePage, itemsPerPage, sort, order, activeTab, comarca, advogados, pesquisa, numeroProcesso, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda} = this.state;
    this.props.getEntities(estado, activePage - 1, itemsPerPage, `${sort},${order}`, activeTab, comarca, numeroProcesso, advogados,  pesquisa, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda);
  };

  getEntitiesCSV = () => {
    const {estado, activePage, itemsPerPage, sort, order, activeTab, comarca, advogados, pesquisa, numeroProcesso, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda} = this.state;
    this.props.getEntitiesCSV(estado, activePage - 1, itemsPerPage, `${sort},${order}`, activeTab, comarca, numeroProcesso, advogados,pesquisa, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda);
  };


  render() {
    let selectedComarca = null;
    for (const i in this.props.listaComarcas){
      if(parseInt(this.state.comarca, 10) === this.props.listaComarcas[i].value) {
        selectedComarca = this.props.listaComarcas[i];
      }
    }
    const {processoList, match, totalItems} = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item">Processos</li>
          <li className="breadcrumb-item active">{Estado[this.state.estado]}</li>
        </ol>
        <h1 className="page-header">Processos<small> &nbsp; {Estado[this.state.estado]}</small></h1>
        <Panel>
          <PanelHeader>
            <Button className={classnames({active: this.state.activeTab === 'todos'}, "btn btn-dark", "mr-3")}
                    onClick={() => {
                      this.toggleTab('todos');
                    }}>
              <span className="d-sm-none">Todos</span>
              <span className="d-sm-block d-none">Todos</span>
            </Button>

            <Button className={classnames({active: this.state.activeTab === 'sem_clasificacao'}, "btn btn-dark", "mr-2")}
                    onClick={() => {
                      this.toggleTab('sem_clasificacao');
                    }}>
              <span className="d-sm-none">Sem classe</span>
              <span className="d-sm-block d-none">Sem clasificação</span>
            </Button>

            <Button className={classnames({active: this.state.activeTab === 'com_interesse'}, "btn btn-dark", "mr-2")}
                    onClick={() => {
                      this.toggleTab('com_interesse');
                    }}>
              <span className="d-sm-none">Sim</span>
              <span className="d-sm-block d-none">Com interesse</span>
            </Button>

            <Button className={classnames({active: this.state.activeTab === 'sem_interesse'}, "btn btn-dark", "mr-2")}
                    onClick={() => {
                      this.toggleTab('sem_interesse');
                    }}>
              <span className="d-sm-none">Não</span>
              <span className="d-sm-block d-none">Sem interesse</span></Button>

            <Button onClick={this.getEntitiesCSV} className="btn btn-success pull-right">
              <span className="d-sm-none">
                <i className="fa fa-download" aria-hidden={"true"}></i>
              </span>
              <span className="d-sm-block d-none">
                <i className="fa fa-download" aria-hidden={"true"}></i>
                &nbsp; CSV</span>
            </Button>
          </PanelHeader>
          <PanelBody>
            {this.state.pesquisa !== undefined ?
              <UncontrolledAlert color="warning" key={this.state.pesquisa}>
                <i className="fa fa-info-circle" aria-hidden={"true"}></i>{' '}
                Os processos listados pertencem à pesquisa <strong>nº {this.state.pesquisa}</strong>
              </UncontrolledAlert>
              : ''
            }
            <CardHeader className={"p-2"} style={{backgroundColor:"#e9ecef", borderBottom:"0px"}}>
              <DropdownToggle nav caret right id="toggler" style={{ marginBottom: '0.5rem', paddingBottom: "0px", color: "#495057"}}>
                Filtros&nbsp;
              </DropdownToggle>
            </CardHeader>
            <UncontrolledCollapse toggler="#toggler">
              <CardBody>
                <AvForm ref={(el) => this.myFormRef = el} id="form-filter" onSubmit={this.filterEntity}>
                  <div className="row mt-1 ml-3 mr-3">
                    <div className="col-md-3">
                      <Label for="comarca" className="col-form-label">Comarca</Label>
                      <Select
                        id={"comarcaTjId"}
                        name={"comarcaTjId"}
                        value={selectedComarca}
                        options={this.props.listaComarcas}
                        placeholder="Selecione uma comarca"
                        onChange={this.selectComarcaChange}
                        required={true}/>
                    </div>
                    <div className="col-md-3">
                      <Label for="numero-porocesso" className=" col-form-label">Numero do processo</Label>
                      <AvInput type="text" name="numeroProcesso" id="numero-porocesso" placeholder="Insere o numero do processo" value={this.state.numeroProcesso}/>
                    </div>
                    <div className="col-md-3">
                      <Label for="assunto" className="col-form-label">Assunto</Label>
                      <AvInput type="text" name="assunto" id="assunto" placeholder="Insere o assunto"  value={this.state.assunto} />
                    </div>
                    <div className="col-md-3">
                      <Label for="advogados" className="col-form-label">Advogados</Label>
                      <AvInput type="select" name="advogados" defaultValue={this.state.advogados}
                               placeholder="Advogados">
                        <option value={''}>Indiferente</option>
                        <option value={'1'}>Sim</option>
                        <option value={'0'}>Não</option>
                      </AvInput>
                    </div>
                  </div>
                  <div className="row mb-4 mt-2 ml-3 mr-3">
                    <div className="col-md-3">
                      <Label for="distribuicao_inicial" className="col-form-label ">Distribuição inicial</Label>
                      <DatePicker defaultValue={this.state.distribuicaoInicial}
                                  placeholderText="Selecione a data inicial"
                                  selected={this.state.distribuicaoInicial}
                                  onChange={this.changeFilterDistribuicaoInicial}
                                  className="form-control"
                                  dateFormat="dd/MM/yyyy"
                      />
                    </div>
                    <div className="col-md-3">
                      <Label for="distribuicao_final" className="col-form-label ">Distribuição final</Label>
                      <DatePicker defaultValue={this.state.distribuicaoFinal}
                                  placeholderText="Selecione a data final"
                                  selected={this.state.distribuicaoFinal}
                                  onChange={this.changeFilterDistribuicaoFinal}
                                  className="form-control"
                                  dateFormat="dd/MM/yyyy"
                      />
                    </div>
                    <div className="col-md-2">
                      <Label for="moeda" className="col-form-label">Moeda</Label>
                      <AvInput type="select" name="moeda" defaultValue={this.state.moeda}
                               placeholder="Moeda">
                        <option value={''}>Indiferente</option>
                        <option value={'R$'}>R$</option>
                        <option value={'Cr$'}>Cr$</option>
                      </AvInput>
                    </div>
                    <div className="col-md-2">
                      <Label for="valor-inicial" className="col-form-label">Valor inicial</Label>
                      <AvInput type="number" min="0" name="valorInicial" id="valor-inicial" placeholder="Insere o valor inicial" value={this.state.valorInicial ? this.state.valorInicial : ''}/>
                    </div>
                    <div className="col-md-2">
                      <Label for="valor-final" className="col-form-label">Valor final</Label>
                      <AvInput type="number" min="1" name="valorFinal" id="valor-final" placeholder="Insere o valor final"  value={this.state.valorFinal ? this.state.valorFinal : ''} />
                    </div>
                  </div>

                  <div className="row mb-2 mr-4 justify-content-end">
                    <Button className="btn btn-success" type="submit">
                      <i className="fa fa-filter" aria-hidden={"true"}></i>
                      &nbsp;
                      Filtrar
                    </Button>
                    &nbsp;
                    <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                      <FontAwesomeIcon icon="trash-alt" />
                      &nbsp;
                      Limpar
                    </div>
                  </div>
                </AvForm>
              </CardBody>
            </UncontrolledCollapse>
            <div className="table-responsive" style={{marginTop: "20px"}}>
              {processoList && processoList.length > 0 ? (
                <Table responsive aria-describedby="processo-heading">
                  <thead className="thead-light" color="primary">
                  <tr >
                    <th className="hand align-middle" onClick={this.sort('numero')} style={{width: '20%'}}>
                      Numero <FontAwesomeIcon icon={this.sortIcon('numero')}/>
                    </th>
                    <th className="hand align-middle text-center" onClick={this.sort('dataCriacao')} style={{width: '13%'}}>
                      Data de criação <FontAwesomeIcon icon={this.sortIcon('dataCriacao')} />
                    </th>
                    <th className="hand align-middle" onClick={this.sort('comarca')} style={{width: '15%'}}>
                      Comarca <FontAwesomeIcon icon={this.sortIcon('comarca')} />
                    </th>
                    <th className="hand align-middle text-center" onClick={this.sort('dataDistribuicao')} style={{width: '15%'}}>
                      Data de distribuição <FontAwesomeIcon icon={this.sortIcon('dataDistribuicao')} />
                    </th>
                    <th className="hand align-middle text-center" onClick={this.sort('valor')} style={{width: '20%'}}>
                      Valor <FontAwesomeIcon icon={this.sortIcon('valor')} />
                    </th>
                    <th className="hand align-middle text-center" style={{width: '20%'}}>Ações </th>
                  </tr>
                  </thead>
                  <tbody>
                  {processoList.map((processo, i) => (
                    <tr className={processo.comarcaNome === "" ? "table-success" : ""} key={`entity-${i}`}>
                      <td>
                        <Button tag={Link}
                                to={`${match.url}/${processo.id}?${this.getFiltersURL(((this.state.activePage-1) * ITEMS_PER_PAGE ) + i )}`}
                                color="link" size="sm"
                                className={"text-left"}>
                          {processo.numero}
                        </Button>
                      </td>
                      <td className={"align-middle text-center"}>
                        <TextFormat type="date" value={processo.dataCriacao} format={APP_LOCAL_DATETIME_FORMAT}/>
                      </td>
                      <td className={"align-middle"}>{processo.comarcaNome}</td>
                      <td className={"align-middle text-center"}>
                        <TextFormat type="date" value={processo.dataDistribuicao} format={APP_LOCAL_DATE_FORMAT}/>
                      </td>
                      <td className={"align-middle text-center"}>
                        {processo.moeda == currency.CRUZEIRO ?
                          <div style={{color: "#DC143C", display: "inline-flex"}}>
                            <EasyEdit
                              type="select"
                              options={[
                                {label: currency.REAIS, value: currency.REAIS},
                                {label: currency.CRUZEIRO, value: currency.CRUZEIRO}]}
                              onSave={(moeda) => this.editMoeda(processo.id, moeda)}
                              placeholder= {processo.moeda ? processo.moeda: '$'}
                              saveButtonLabel={<FontAwesomeIcon icon="check"/>}
                              cancelButtonLabel={<FontAwesomeIcon icon="times"/>}
                              cancelButtonStyle="btn btn-xs btn-danger"
                              saveButtonStyle="btn btn-xs btn-success"
                            /> &nbsp;
                            <EasyEdit
                              type={Types.NUMBER}
                              value={processo.valor}
                              onSave={(valor) => this.editValorAcao(processo.id, valor)}
                              saveButtonLabel={<FontAwesomeIcon icon="check"/>}
                              cancelButtonLabel={<FontAwesomeIcon icon="times"/>}
                              attributes={{ name: "awesome-input", class: "form-control form-control-sm" }}
                              placeholder="indisponível"
                              cancelButtonStyle="btn btn-xs btn-danger"
                              saveButtonStyle="btn btn-xs btn-success"
                            />
                          </div>
                            :
                          <div style={{display: "inline-flex"}}>
                            <EasyEdit
                              type="select"
                              options={[
                                {label: currency.REAIS, value: currency.REAIS},
                                {label: currency.CRUZEIRO, value: currency.CRUZEIRO}]}
                              onSave={(moeda) => this.editMoeda(processo.id, moeda)}
                              placeholder= {processo.moeda ? processo.moeda: '$'}
                              saveButtonLabel={<FontAwesomeIcon icon="check"/>}
                              cancelButtonLabel={<FontAwesomeIcon icon="times"/>}
                              cancelButtonStyle="btn btn-xs btn-danger"
                              saveButtonStyle="btn btn-xs btn-success"
                            />
                            &nbsp;
                            <EasyEdit
                              type={Types.NUMBER}
                              value={processo.valor}
                              onSave={(valor) => this.editValorAcao(processo.id, valor)}
                              saveButtonLabel={<FontAwesomeIcon icon="check"/>}
                              cancelButtonLabel={<FontAwesomeIcon icon="times"/>}
                              attributes={{ name: "awesome-input", class: "form-control form-control-sm" }}
                              placeholder="indisponível"
                              cancelButtonStyle="btn btn-xs btn-danger"
                              saveButtonStyle="btn btn-xs btn-success"
                            />
                          </div>}
                      </td>
                      <td className="text-center align-middle ">
                        <div className="btn-group flex-btn-group-container">
                          <div hidden={this.state.activeTab === 'todos' || this.state.activeTab === 'com_interesse'}>
                            <div className={"btn btn-sm btn-success hand mr-1"} id={"comInteresse-" + processo.id}
                                 onClick={() => this.saveInteresse(processo.id, true)}>
                              <span className="d-sm-block">
                                   <i className="fa fa-thumbs-up" aria-hidden={"true"}></i>
                              </span>
                            </div>
                          </div>
                          {this.state.activeTab !== 'todos' && this.state.activeTab !== 'com_interesse' ?
                            <UncontrolledTooltip placement="top" target={"comInteresse-" + processo.id}>
                              Classificar como Interesse
                            </UncontrolledTooltip> : ('')
                          }

                          <div hidden={this.state.activeTab === 'todos' || this.state.activeTab === 'sem_interesse'}>
                            <div className={"btn btn-sm btn-dark hand mr-1"} id={"semInteresse-" + processo.id}
                                 onClick={() => this.saveInteresse(processo.id, false)}>
                              <span className="d-sm-block">
                                   <i className="fa fa-thumbs-down" aria-hidden={"true"}></i>
                              </span>
                            </div>
                          </div>
                          {this.state.activeTab !== 'todos' && this.state.activeTab !== 'sem_interesse' ?
                            <UncontrolledTooltip placement="top" target={"semInteresse-" + processo.id}>
                              Classificar sem Interesse
                            </UncontrolledTooltip> : ('')
                          }

                          <div hidden={this.state.activeTab === 'todos' || this.state.activeTab === 'sem_clasificacao'}>
                            <div className={"btn btn-sm btn-danger hand mr-1"} id={"semclassificacao-" + processo.id}
                                 onClick={() => this.saveInteresse(processo.id, null)}>
                              <span className="d-sm-block">
                                <i className="fa fa-ban" aria-hidden={"true"}></i>
                              </span>
                            </div>
                          </div>
                          {this.state.activeTab !== 'todos' && this.state.activeTab !== 'sem_clasificacao' ?
                            <UncontrolledTooltip placement="top" target={"semclassificacao-" + processo.id}>
                              Apagar classificação
                            </UncontrolledTooltip> : ('')
                          }

                          <ModalObservacao value={processo.observacao}
                                           insertObservacao={(event, errors, values) => this.insertObservacao(event, errors, values, processo.id)}
                                           fullObservacao={this.state.activeTab === 'sem_clasificacao'}
                                           processoId={processo.id}
                          />
                          &nbsp;
                          <Button id={"link-" + processo.id}
                                  href={processo.link}
                                  size="sm"
                                  target="_blank"
                                  variant="secondary"
                                  className={"fa fa-link"}>
                          </Button>
                          <UncontrolledTooltip placement="top" target={"link-" + processo.id}>
                            Visualizar Processo no TJ
                          </UncontrolledTooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-warning">Não foram encontrados processos</div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={processoList && processoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({processo}: IRootState) => ({
  processoList: processo.entities,
  totalItems: processo.totalItems,
  csvError: processo.csvError,
  listaComarcas: processo.listaComarcas
});

const mapDispatchToProps = {
  getEntities, updateInteresseEntity, getEntitiesCSV, insertObservacao, prencherComarcas, editValorAcao, editMoeda
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Processo);
