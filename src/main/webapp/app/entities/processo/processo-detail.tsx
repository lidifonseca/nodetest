import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Table, UncontrolledTooltip} from 'reactstrap';
import {Translate, TextFormat, IPaginationBaseState} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './processo.scss';
import {IRootState} from 'app/shared/reducers';
import {
  editValorAcao,
  getEntity,
  editMoeda,
  getEntityFilter,
  updateInteresseEntityDetails
} from './processo.reducer';
import {APP_LOCAL_DATE_FORMAT, currency} from 'app/config/constants';
import EasyEdit, {Types} from "react-easy-edit";
import {Panel, PanelHeader, PanelBody} from 'app/shared/layout/panel/panel.tsx';
import {
  getProcessoState,
  getProcessoStateDetails,
  getSortState,
  IProcessoBaseState,
  IProcessoBaseStateDetails
} from "app/entities/processo/processo-utils";

import classnames from 'classnames';
import {ITEMS_PER_PAGE} from "app/shared/util/pagination.constants";

export interface IProcessoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string, estado: string }> {
}


export interface IProcessoDetailState extends IProcessoBaseState, IPaginationBaseState, IProcessoBaseStateDetails {
  estado: string;
  pesquisa?: number;
}

export class ProcessoDetail extends React.Component<IProcessoDetailProps, IProcessoDetailState> {

  constructor(props) {
    super(props);
    this.getEntityFilter = this.getEntityFilter.bind(this);
    this.updateInteresse = this.updateInteresse.bind(this);
    this.state = {
      estado: props.match.params.estado,
      ...getProcessoStateDetails(this.props.location),
      ...getProcessoState(this.props.location),
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
    };
  }

  editValorAcao = (id, valor) => {
    this.props.editValorAcao(id, valor, null);
  };

  editMoeda = (id, valor) => {
    this.props.editMoeda(id, valor, null);
  };

  updateInteresse = (id, valor) => {
    const {estado, activePage, itemsPerPage, sort, order, activeTab, comarca, advogados, pesquisa, numeroProcesso, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda} = this.state;
    const filters = [estado, activePage - 1, itemsPerPage, `${sort},${order}`, activeTab, comarca, numeroProcesso, advogados, pesquisa, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda];

    this.props.updateInteresseEntityDetails(id, valor, filters)
  };

  next = () => {
    this.setState(
      {
        offset: this.state.offset + 1
      },
      () => this.getEntityFilter()
    );
  };

  prev = () => {
    this.setState(
      {
        offset: this.state.offset - 1
      },
      () => this.getEntityFilter()
    );

  };

  componentDidMount() {
    this.getEntityFilter();
  }

  getEntityFilter() {
    const {estado, offset, sort, order, activeTab, comarca, advogados, pesquisa, numeroProcesso, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda} = this.state;

    this.props.getEntityFilter(estado, offset, 1, `${sort},${order}`, activeTab, comarca, numeroProcesso, advogados, pesquisa, assunto, distribuicaoInicial, distribuicaoFinal, valorInicial, valorFinal, moeda);
    this.props.history.push(this.props.location.pathname + '?' + this.getFiltersURL());
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

  render() {
    const {processoEntity} = this.props;
    return (
      <div>
        <Button tag={Link} to={`/processo/${this.state.estado}${this.state.pesquisa ? '/pesquisa/' + this.state.pesquisa : ''}${this.props.location.search}`} replace color="dark">
          <FontAwesomeIcon icon="arrow-left"/>{' '}
          <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
        </Button>

        <Button className={classnames("btn btn-dark", "mr-3", " pull-right")}
                disabled={this.state.offset >= this.props.totalItems - 1}
                onClick={this.next}>
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.next">Next</Translate>
          </span>{' '}
          <FontAwesomeIcon icon="arrow-right"/>
        </Button>


        <Button className={classnames("btn btn-dark", "mr-3", " pull-right")}
                disabled={(this.state.offset < 1)}
                onClick={this.prev}>
          <FontAwesomeIcon icon="arrow-left"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.prev">Prev</Translate>
        </span>
        </Button>
        <br/>
        <br/>

        <Panel>
          <PanelHeader>
            Dados do processo &nbsp;
            <i> ({processoEntity.interesse === null ? ('Sem clasificação') : processoEntity.interesse === true ? 'Com Interesse' : 'Sem Interesse'}) </i>

            {processoEntity.interesse !== true ?
              <div className="pull-right">
                <div className={"btn btn-sm btn-success hand mr-2"} id={"comInteresseDetalhe-" + processoEntity.id}
                     onClick={() => this.updateInteresse(processoEntity.id, true)}>
                  <span className="d-sm-block">
                       <i className="fa fa-thumbs-up" aria-hidden={"true"}></i>
                    </span>
                </div>
                <UncontrolledTooltip placement="top" target={"comInteresseDetalhe-" + processoEntity.id} key={"comInteresseDetalhe-" + processoEntity.id}>
                  Classificar como Interesse
                </UncontrolledTooltip>
              </div>
              : ('')}

            {processoEntity.interesse !== false ?
              <div className="pull-right">
                <div className={"btn btn-sm btn-dark hand mr-2"} id={"semInteresseDetalhe-" + processoEntity.id}
                     onClick={() => this.updateInteresse(processoEntity.id, false)}>
                    <span className="d-sm-block">
                         <i className="fa fa-thumbs-down" aria-hidden={"true"}></i>
                    </span>
                </div>
                <UncontrolledTooltip placement="top" target={"semInteresseDetalhe-" + processoEntity.id} key={"semInteresseDetalhe-" + processoEntity.id}>
                  Classificar sem Interesse
                </UncontrolledTooltip>
              </div>
              : ('')}

            {processoEntity.interesse !== null ?
              <div className="pull-right">
                <div className={"btn btn-sm btn-danger hand mr-2"} id={"semClasificacaoDetalhe-" + processoEntity.id}
                     onClick={() => this.updateInteresse(processoEntity.id, null)}>
                  <span className="d-sm-block">
                       <i className="fa fa-ban" aria-hidden={"true"}></i>
                  </span>
                </div>
                <UncontrolledTooltip placement="top" target={"semClasificacaoDetalhe-" + processoEntity.id} key={"semClasificacaoDetalhe-" + processoEntity.id}>
                  Apagar classificação
                </UncontrolledTooltip>
              </div>
              : ('')}

          </PanelHeader>
          <PanelBody>
            <div className="row mt-3">
              <div className="col-md-3">
                <h5 className="card-title">Numero</h5>
                <p className="card-text">{processoEntity.numero}</p>
              </div>
              <div className="col-md-3">
                <h5 className="card-title">Documento</h5>
                <p className="card-text">{processoEntity.cnpj}</p>
              </div>
              <div className="col-md-3">
                <h5 className="card-title">Classe</h5>
                <p className="card-text">{processoEntity.classe}</p>
              </div>
              <div className="col-md-3">
                <h5 className="card-title">Assunto</h5>
                <p className="card-text">{processoEntity.assunto}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3">
                <h5 className="card-title">Comarca</h5>
                <p className="card-text">{processoEntity.comarcaNome}</p>
              </div>
              <div className="col-md-3">
                <h5 className="card-title">Vara</h5>
                <p className="card-text">{processoEntity.vara}</p>
              </div>
              <div className="col-md-3">
                <h5 className="card-title">Juiz</h5>
                <p className="card-text">{processoEntity.juiz}</p>
              </div>
              <div className="col-md-3">
                <h5 className="card-title">Data Distribuição</h5>
                <p className="card-text"><TextFormat value={processoEntity.dataDistribuicao} type="date"
                                                     format={APP_LOCAL_DATE_FORMAT}/></p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3">
                <h5 className="card-title">Distribuicao</h5>
                <p className="card-text">{processoEntity.distribuicao}</p>
              </div>
              <div className="col-md-3">
                <h5 className="card-title">Local Fisico</h5>
                <p className="card-text">{processoEntity.localFisico}</p>
              </div>
              <div className="col-md-3">
                <h5 className="card-title">Controle</h5>
                <p className="card-text">{processoEntity.controle}</p>
              </div>
              <div className="col-md-3">
                <h5 className="card-title">Area</h5>
                <p className="card-text">{processoEntity.area}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3">
                <h5 className="card-title">Estado</h5>
                <p className="card-text">{processoEntity.estado}</p>
              </div>
              <div className="col-md-3">
                <h5 className="card-title">Valor da ação</h5>
                {processoEntity.moeda == currency.CRUZEIRO ?
                  <div style={{color: "#DC143C", display: "inline-flex"}}>
                    <EasyEdit
                      type="select"
                      options={[
                        {label: currency.REAIS, value: currency.REAIS},
                        {label: currency.CRUZEIRO, value: currency.CRUZEIRO}]}
                      onSave={(moeda) => this.editMoeda(processoEntity.id, moeda)}
                      placeholder={processoEntity.moeda ? processoEntity.moeda : '$'}
                      saveButtonLabel={<FontAwesomeIcon icon="check"/>}
                      cancelButtonLabel={<FontAwesomeIcon icon="times"/>}
                      cancelButtonStyle="btn btn-xs btn-danger"
                      saveButtonStyle="btn btn-xs btn-success"
                    /> &nbsp;
                    <EasyEdit
                      type={Types.NUMBER}
                      value={processoEntity.valor}
                      onSave={(valor) => this.editValorAcao(processoEntity.id, valor)}
                      saveButtonLabel={<FontAwesomeIcon icon="check"/>}
                      cancelButtonLabel={<FontAwesomeIcon icon="times"/>}
                      attributes={{name: "awesome-input", class: "form-control form-control-sm"}}
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
                      onSave={(moeda) => this.editMoeda(processoEntity.id, moeda)}
                      placeholder={processoEntity.moeda ? processoEntity.moeda : '$'}
                      saveButtonLabel={<FontAwesomeIcon icon="check"/>}
                      cancelButtonLabel={<FontAwesomeIcon icon="times"/>}
                      cancelButtonStyle="btn btn-xs btn-danger"
                      saveButtonStyle="btn btn-xs btn-success"
                    />
                    &nbsp;
                    <EasyEdit
                      type={Types.NUMBER}
                      value={processoEntity.valor}
                      onSave={(valor) => this.editValorAcao(processoEntity.id, valor)}
                      saveButtonLabel={<FontAwesomeIcon icon="check"/>}
                      cancelButtonLabel={<FontAwesomeIcon icon="times"/>}
                      attributes={{name: "awesome-input", class: "form-control form-control-sm"}}
                      placeholder="indisponível"
                      cancelButtonStyle="btn btn-xs btn-danger"
                      saveButtonStyle="btn btn-xs btn-success"
                    />
                  </div>}
              </div>
              <div className="col-md-6">
                <h5 className="card-title">Observação</h5>
                <p className="card-text">{processoEntity.observacao}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <a href={processoEntity.link} target="_blank">Clique para ir ao processo</a>
                <p className="card-text link-process-text"><i>Você será redirecionado ao Site do TJ e precisa estar com
                  login ativo para acessar essa URL</i></p>
              </div>
            </div>
          </PanelBody>
        </Panel>

        <div className="row">
          <div className="col-md-6">
            <Panel>
              <PanelHeader>PARTES DO PROCESSO</PanelHeader>
              <PanelBody>
                <Table striped responsive aria-describedby="processo-heading">
                  <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Participante</th>
                    <th>Advogados</th>
                  </tr>
                  </thead>
                  <tbody>
                  {processoEntity.partes
                    ? processoEntity.partes.map((parte) => (
                      <tr key={parte.id}>
                        <td>{parte.categoria}</td>
                        <td>{parte.participante}</td>
                        <td>
                          <ul>
                            {parte.advogados ? JSON.parse(parte.advogados).map((advogado, i) => (
                              <li key={i}>{advogado}</li>
                            )) : null}
                          </ul>
                        </td>
                      </tr>
                    ))
                    : null}
                  </tbody>
                </Table>
              </PanelBody>
            </Panel>
          </div>
          <div className="col-md-6">
            <Panel>
              <PanelHeader>PETIÇÕES DIVERSAS</PanelHeader>
              <PanelBody>
                <Table striped responsive aria-describedby="processo-heading">
                  <thead>
                  <tr>
                    <th>Data</th>
                    <th>Movimento</th>
                  </tr>
                  </thead>
                  <tbody>
                  {processoEntity.peticoes
                    ? processoEntity.peticoes.map((peticao) => (
                      <tr key={peticao.id}>
                        <td><TextFormat value={peticao.data} type="date" format={APP_LOCAL_DATE_FORMAT}/></td>
                        <td>{peticao.tipo}</td>
                      </tr>
                    ))
                    : null}
                  </tbody>
                </Table>
              </PanelBody>
            </Panel>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Panel>
              <PanelHeader>INCIDENTES, AÇÕES INCIDENTAIS, RECURSOS E EXECUÇÕES DE SENTENÇAS</PanelHeader>
              <PanelBody>
                <Table striped responsive aria-describedby="processo-heading">
                  <thead>
                  <tr>
                    <th>Recebido em</th>
                    <th>Classe</th>
                  </tr>
                  </thead>
                  <tbody>
                  {processoEntity.incidentes
                    ? processoEntity.incidentes.map((incidente) => (
                      <tr key={incidente.id}>
                        <td><TextFormat value={incidente.recebedoEm} type="date" format={APP_LOCAL_DATE_FORMAT}/></td>
                        <td>{incidente.clase}</td>
                      </tr>
                    ))
                    : null}
                  </tbody>
                </Table>
              </PanelBody>
            </Panel>
          </div>
          <div className="col-md-6">
            <Panel>
              <PanelHeader>APENSOS, ENTRANHADOS E UNIFICADOS</PanelHeader>
              <PanelBody>
                <Table striped responsive aria-describedby="processo-heading">
                  <thead>
                  <tr>
                    <th>Numero</th>
                    <th>Classe</th>
                    <th>Apensamento</th>
                    <th>Motivo</th>
                  </tr>
                  </thead>
                  <tbody>
                  {processoEntity.apensos
                    ? processoEntity.apensos.map((apenso) => (
                      <tr key={apenso.id}>
                        <td>{apenso.numero}</td>
                        <td>{apenso.clase}</td>
                        <td>{apenso.apensamento}</td>
                        <td>{apenso.clase}</td>
                        <td>{apenso.motivo}</td>
                      </tr>
                    ))
                    : null}
                  </tbody>
                </Table>
              </PanelBody>
            </Panel>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Panel>
              <PanelHeader>AUDIÊNCIAS</PanelHeader>
              <PanelBody>
                <Table striped responsive aria-describedby="processo-heading">
                  <thead>
                  <tr>
                    <th>Data</th>
                    <th>Audiência</th>
                    <th>Situação</th>
                  </tr>
                  </thead>
                  <tbody>
                  {processoEntity.audioencias
                    ? processoEntity.audioencias.map((audiencia) => (
                      <tr key={audiencia.id}>
                        <td><TextFormat value={audiencia.data} type="date" format={APP_LOCAL_DATE_FORMAT}/></td>
                        <td>{audiencia.audencia}</td>
                        <td>{audiencia.situacao}</td>
                      </tr>
                    ))
                    : null}
                  </tbody>
                </Table>
              </PanelBody>
            </Panel>
          </div>
          <div className="col-md-6">
            <Panel>
              <PanelHeader>HISTÓRICO DE CLASSES</PanelHeader>
              <PanelBody>
                <Table striped responsive aria-describedby="processo-heading">
                  <thead>
                  <tr>
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Classe</th>
                    <th>Área</th>
                    <th>Motivo</th>
                  </tr>
                  </thead>
                  <tbody>
                  {processoEntity.historicos
                    ? processoEntity.historicos.map((historico) => (
                      <tr key={historico.id}>
                        <td>{<TextFormat value={historico.data} type="date" format={APP_LOCAL_DATE_FORMAT}/>}</td>
                        <td>{historico.tipo}</td>
                        <td>{historico.classe}</td>
                        <td>{historico.area}</td>
                        <td>{historico.motivo}</td>
                      </tr>
                    ))
                    : null}
                  </tbody>
                </Table>
              </PanelBody>
            </Panel>
          </div>
        </div>

        <Panel>
          <PanelHeader>MOVIMENTAÇÕES</PanelHeader>
          <PanelBody>
            <Table id="movimentacaoTable" striped responsive aria-describedby="processo-heading">
              <thead>
              <tr>
                <th style={{width: '10%'}}>Data</th>
                <th style={{width: '90%'}}>Movimento</th>
              </tr>
              </thead>
              <tbody>
              {processoEntity.movimentacoes
                ? processoEntity.movimentacoes.map((movimentacao) => (
                  <tr key={movimentacao.id}>
                    <td><TextFormat value={movimentacao.data} type="date" format={APP_LOCAL_DATE_FORMAT}/></td>
                    <td dangerouslySetInnerHTML={{__html: movimentacao.movimento}}></td>
                  </tr>
                ))
                : null}
              </tbody>
            </Table>
          </PanelBody>
        </Panel>

        <Button tag={Link} to={`/processo/${this.state.estado}${this.state.pesquisa ? '/pesquisa/' + this.state.pesquisa : ''}${this.props.location.search}`} replace color="dark">
          <FontAwesomeIcon icon="arrow-left"/>{' '}
          <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
        </Button>


        <Button className={classnames("btn btn-dark", "mr-3", " pull-right")}
                disabled={this.state.offset >= this.props.totalItems - 1}
                onClick={this.next}>
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.next">Next</Translate>
          </span>{' '}
          <FontAwesomeIcon icon="arrow-right"/>
        </Button>


        <Button className={classnames("btn btn-dark", "mr-3", " pull-right")}
                disabled={(this.state.offset < 1)}
                onClick={this.prev}>
          <FontAwesomeIcon icon="arrow-left"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.prev">Prev</Translate>
        </span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({processo}: IRootState) => ({
  processoEntity: processo.entity,
  totalItems: processo.totalItems
});

const mapDispatchToProps = {getEntity, editValorAcao, editMoeda, getEntityFilter, updateInteresseEntityDetails};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessoDetail);
