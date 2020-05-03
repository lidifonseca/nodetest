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
import { getEntities } from './paciente-diario-tags.reducer';
import { IPacienteDiarioTags } from 'app/shared/model/paciente-diario-tags.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteDiarioTagsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteDiarioTagsBaseState {
  idPacienteDiario: any;
  idDiarioTags: any;
  escalaDePlantao: any;
  captacaoEdp: any;
  implantacaoEdp: any;
  furoDeEscalaEdp: any;
  solicitacaoDeFolgaEdp: any;
  trocaDeProfissionalEdp: any;
  reclamacaoEdp: any;
  elogioEdp: any;
  recusaDeAtendimentoEdp: any;
  duplicidadeEdp: any;
  monitorarEdp: any;
  pendenteEdp: any;
  escalaMultiProfissional: any;
  captacaoEmp: any;
  implantacaoEmp: any;
  solicitacaoDeFolgaEmp: any;
  trocaDeProfissionalEmp: any;
  reclamacaoEmp: any;
  elogioEmp: any;
  padIncompletoEmp: any;
  visitaImprodutivaEmp: any;
  monitorarEmp: any;
  pendenteEmp: any;
  intercorrencia: any;
  clinicaInter: any;
  aphInter: any;
  pendenteInter: any;
  solicitacoes: any;
  recargaDeOxigenioSolic: any;
  equipamentosSolic: any;
  matmedSolic: any;
  prontuarioSolic: any;
  prescricoesSolic: any;
  examesSolic: any;
  ambulanciaSolic: any;
  atendimentoDeEquipeSolic: any;
  monitorarSolic: any;
  pendenteSolic: any;
  avaliacao: any;
  residenciaAval: any;
  hospitalAval: any;
  monitorarAval: any;
  captacaoAtivaAval: any;
  pendenteAval: any;
  implantacao: any;
  monitorarImpl: any;
  pendenteImpl: any;
  alta: any;
  hospitalizacaoAlt: any;
  migracaoDeEmpresaAlt: any;
  obitoEmCasaAlt: any;
  terminoDeAtendimentoAlt: any;
  atendimentoSuspensoAlt: any;
  monitorarAlt: any;
  pendenteAlt: any;
  eCommerceSegViagem: any;
  monitorarEcsv: any;
  pendenteEcsv: any;
  farmacia: any;
  matMedFarm: any;
  receitaFarm: any;
  prontuarioFarm: any;
  romaneioManualFarm: any;
  outrosFarm: any;
  monitorarFarm: any;
  pendenteFarm: any;
  contatoTelefonico: any;
  ativoContTel: any;
  receptivoContTel: any;
  monitorarContTel: any;
  pendenteContTel: any;
  dtPost: any;
}
export interface IPacienteDiarioTagsState extends IPacienteDiarioTagsBaseState, IPaginationBaseState {}

export class PacienteDiarioTags extends React.Component<IPacienteDiarioTagsProps, IPacienteDiarioTagsState> {
  private myFormRef: any;

  constructor(props: IPacienteDiarioTagsProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPacienteDiarioTagsState(this.props.location)
    };
  }

  getPacienteDiarioTagsState = (location): IPacienteDiarioTagsBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idPacienteDiario = url.searchParams.get('idPacienteDiario') || '';
    const idDiarioTags = url.searchParams.get('idDiarioTags') || '';
    const escalaDePlantao = url.searchParams.get('escalaDePlantao') || '';
    const captacaoEdp = url.searchParams.get('captacaoEdp') || '';
    const implantacaoEdp = url.searchParams.get('implantacaoEdp') || '';
    const furoDeEscalaEdp = url.searchParams.get('furoDeEscalaEdp') || '';
    const solicitacaoDeFolgaEdp = url.searchParams.get('solicitacaoDeFolgaEdp') || '';
    const trocaDeProfissionalEdp = url.searchParams.get('trocaDeProfissionalEdp') || '';
    const reclamacaoEdp = url.searchParams.get('reclamacaoEdp') || '';
    const elogioEdp = url.searchParams.get('elogioEdp') || '';
    const recusaDeAtendimentoEdp = url.searchParams.get('recusaDeAtendimentoEdp') || '';
    const duplicidadeEdp = url.searchParams.get('duplicidadeEdp') || '';
    const monitorarEdp = url.searchParams.get('monitorarEdp') || '';
    const pendenteEdp = url.searchParams.get('pendenteEdp') || '';
    const escalaMultiProfissional = url.searchParams.get('escalaMultiProfissional') || '';
    const captacaoEmp = url.searchParams.get('captacaoEmp') || '';
    const implantacaoEmp = url.searchParams.get('implantacaoEmp') || '';
    const solicitacaoDeFolgaEmp = url.searchParams.get('solicitacaoDeFolgaEmp') || '';
    const trocaDeProfissionalEmp = url.searchParams.get('trocaDeProfissionalEmp') || '';
    const reclamacaoEmp = url.searchParams.get('reclamacaoEmp') || '';
    const elogioEmp = url.searchParams.get('elogioEmp') || '';
    const padIncompletoEmp = url.searchParams.get('padIncompletoEmp') || '';
    const visitaImprodutivaEmp = url.searchParams.get('visitaImprodutivaEmp') || '';
    const monitorarEmp = url.searchParams.get('monitorarEmp') || '';
    const pendenteEmp = url.searchParams.get('pendenteEmp') || '';
    const intercorrencia = url.searchParams.get('intercorrencia') || '';
    const clinicaInter = url.searchParams.get('clinicaInter') || '';
    const aphInter = url.searchParams.get('aphInter') || '';
    const pendenteInter = url.searchParams.get('pendenteInter') || '';
    const solicitacoes = url.searchParams.get('solicitacoes') || '';
    const recargaDeOxigenioSolic = url.searchParams.get('recargaDeOxigenioSolic') || '';
    const equipamentosSolic = url.searchParams.get('equipamentosSolic') || '';
    const matmedSolic = url.searchParams.get('matmedSolic') || '';
    const prontuarioSolic = url.searchParams.get('prontuarioSolic') || '';
    const prescricoesSolic = url.searchParams.get('prescricoesSolic') || '';
    const examesSolic = url.searchParams.get('examesSolic') || '';
    const ambulanciaSolic = url.searchParams.get('ambulanciaSolic') || '';
    const atendimentoDeEquipeSolic = url.searchParams.get('atendimentoDeEquipeSolic') || '';
    const monitorarSolic = url.searchParams.get('monitorarSolic') || '';
    const pendenteSolic = url.searchParams.get('pendenteSolic') || '';
    const avaliacao = url.searchParams.get('avaliacao') || '';
    const residenciaAval = url.searchParams.get('residenciaAval') || '';
    const hospitalAval = url.searchParams.get('hospitalAval') || '';
    const monitorarAval = url.searchParams.get('monitorarAval') || '';
    const captacaoAtivaAval = url.searchParams.get('captacaoAtivaAval') || '';
    const pendenteAval = url.searchParams.get('pendenteAval') || '';
    const implantacao = url.searchParams.get('implantacao') || '';
    const monitorarImpl = url.searchParams.get('monitorarImpl') || '';
    const pendenteImpl = url.searchParams.get('pendenteImpl') || '';
    const alta = url.searchParams.get('alta') || '';
    const hospitalizacaoAlt = url.searchParams.get('hospitalizacaoAlt') || '';
    const migracaoDeEmpresaAlt = url.searchParams.get('migracaoDeEmpresaAlt') || '';
    const obitoEmCasaAlt = url.searchParams.get('obitoEmCasaAlt') || '';
    const terminoDeAtendimentoAlt = url.searchParams.get('terminoDeAtendimentoAlt') || '';
    const atendimentoSuspensoAlt = url.searchParams.get('atendimentoSuspensoAlt') || '';
    const monitorarAlt = url.searchParams.get('monitorarAlt') || '';
    const pendenteAlt = url.searchParams.get('pendenteAlt') || '';
    const eCommerceSegViagem = url.searchParams.get('eCommerceSegViagem') || '';
    const monitorarEcsv = url.searchParams.get('monitorarEcsv') || '';
    const pendenteEcsv = url.searchParams.get('pendenteEcsv') || '';
    const farmacia = url.searchParams.get('farmacia') || '';
    const matMedFarm = url.searchParams.get('matMedFarm') || '';
    const receitaFarm = url.searchParams.get('receitaFarm') || '';
    const prontuarioFarm = url.searchParams.get('prontuarioFarm') || '';
    const romaneioManualFarm = url.searchParams.get('romaneioManualFarm') || '';
    const outrosFarm = url.searchParams.get('outrosFarm') || '';
    const monitorarFarm = url.searchParams.get('monitorarFarm') || '';
    const pendenteFarm = url.searchParams.get('pendenteFarm') || '';
    const contatoTelefonico = url.searchParams.get('contatoTelefonico') || '';
    const ativoContTel = url.searchParams.get('ativoContTel') || '';
    const receptivoContTel = url.searchParams.get('receptivoContTel') || '';
    const monitorarContTel = url.searchParams.get('monitorarContTel') || '';
    const pendenteContTel = url.searchParams.get('pendenteContTel') || '';
    const dtPost = url.searchParams.get('dtPost') || '';

    return {
      idPacienteDiario,
      idDiarioTags,
      escalaDePlantao,
      captacaoEdp,
      implantacaoEdp,
      furoDeEscalaEdp,
      solicitacaoDeFolgaEdp,
      trocaDeProfissionalEdp,
      reclamacaoEdp,
      elogioEdp,
      recusaDeAtendimentoEdp,
      duplicidadeEdp,
      monitorarEdp,
      pendenteEdp,
      escalaMultiProfissional,
      captacaoEmp,
      implantacaoEmp,
      solicitacaoDeFolgaEmp,
      trocaDeProfissionalEmp,
      reclamacaoEmp,
      elogioEmp,
      padIncompletoEmp,
      visitaImprodutivaEmp,
      monitorarEmp,
      pendenteEmp,
      intercorrencia,
      clinicaInter,
      aphInter,
      pendenteInter,
      solicitacoes,
      recargaDeOxigenioSolic,
      equipamentosSolic,
      matmedSolic,
      prontuarioSolic,
      prescricoesSolic,
      examesSolic,
      ambulanciaSolic,
      atendimentoDeEquipeSolic,
      monitorarSolic,
      pendenteSolic,
      avaliacao,
      residenciaAval,
      hospitalAval,
      monitorarAval,
      captacaoAtivaAval,
      pendenteAval,
      implantacao,
      monitorarImpl,
      pendenteImpl,
      alta,
      hospitalizacaoAlt,
      migracaoDeEmpresaAlt,
      obitoEmCasaAlt,
      terminoDeAtendimentoAlt,
      atendimentoSuspensoAlt,
      monitorarAlt,
      pendenteAlt,
      eCommerceSegViagem,
      monitorarEcsv,
      pendenteEcsv,
      farmacia,
      matMedFarm,
      receitaFarm,
      prontuarioFarm,
      romaneioManualFarm,
      outrosFarm,
      monitorarFarm,
      pendenteFarm,
      contatoTelefonico,
      ativoContTel,
      receptivoContTel,
      monitorarContTel,
      pendenteContTel,
      dtPost
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPacienteDiario: '',
        idDiarioTags: '',
        escalaDePlantao: '',
        captacaoEdp: '',
        implantacaoEdp: '',
        furoDeEscalaEdp: '',
        solicitacaoDeFolgaEdp: '',
        trocaDeProfissionalEdp: '',
        reclamacaoEdp: '',
        elogioEdp: '',
        recusaDeAtendimentoEdp: '',
        duplicidadeEdp: '',
        monitorarEdp: '',
        pendenteEdp: '',
        escalaMultiProfissional: '',
        captacaoEmp: '',
        implantacaoEmp: '',
        solicitacaoDeFolgaEmp: '',
        trocaDeProfissionalEmp: '',
        reclamacaoEmp: '',
        elogioEmp: '',
        padIncompletoEmp: '',
        visitaImprodutivaEmp: '',
        monitorarEmp: '',
        pendenteEmp: '',
        intercorrencia: '',
        clinicaInter: '',
        aphInter: '',
        pendenteInter: '',
        solicitacoes: '',
        recargaDeOxigenioSolic: '',
        equipamentosSolic: '',
        matmedSolic: '',
        prontuarioSolic: '',
        prescricoesSolic: '',
        examesSolic: '',
        ambulanciaSolic: '',
        atendimentoDeEquipeSolic: '',
        monitorarSolic: '',
        pendenteSolic: '',
        avaliacao: '',
        residenciaAval: '',
        hospitalAval: '',
        monitorarAval: '',
        captacaoAtivaAval: '',
        pendenteAval: '',
        implantacao: '',
        monitorarImpl: '',
        pendenteImpl: '',
        alta: '',
        hospitalizacaoAlt: '',
        migracaoDeEmpresaAlt: '',
        obitoEmCasaAlt: '',
        terminoDeAtendimentoAlt: '',
        atendimentoSuspensoAlt: '',
        monitorarAlt: '',
        pendenteAlt: '',
        eCommerceSegViagem: '',
        monitorarEcsv: '',
        pendenteEcsv: '',
        farmacia: '',
        matMedFarm: '',
        receitaFarm: '',
        prontuarioFarm: '',
        romaneioManualFarm: '',
        outrosFarm: '',
        monitorarFarm: '',
        pendenteFarm: '',
        contatoTelefonico: '',
        ativoContTel: '',
        receptivoContTel: '',
        monitorarContTel: '',
        pendenteContTel: '',
        dtPost: ''
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
      'idPacienteDiario=' +
      this.state.idPacienteDiario +
      '&' +
      'idDiarioTags=' +
      this.state.idDiarioTags +
      '&' +
      'escalaDePlantao=' +
      this.state.escalaDePlantao +
      '&' +
      'captacaoEdp=' +
      this.state.captacaoEdp +
      '&' +
      'implantacaoEdp=' +
      this.state.implantacaoEdp +
      '&' +
      'furoDeEscalaEdp=' +
      this.state.furoDeEscalaEdp +
      '&' +
      'solicitacaoDeFolgaEdp=' +
      this.state.solicitacaoDeFolgaEdp +
      '&' +
      'trocaDeProfissionalEdp=' +
      this.state.trocaDeProfissionalEdp +
      '&' +
      'reclamacaoEdp=' +
      this.state.reclamacaoEdp +
      '&' +
      'elogioEdp=' +
      this.state.elogioEdp +
      '&' +
      'recusaDeAtendimentoEdp=' +
      this.state.recusaDeAtendimentoEdp +
      '&' +
      'duplicidadeEdp=' +
      this.state.duplicidadeEdp +
      '&' +
      'monitorarEdp=' +
      this.state.monitorarEdp +
      '&' +
      'pendenteEdp=' +
      this.state.pendenteEdp +
      '&' +
      'escalaMultiProfissional=' +
      this.state.escalaMultiProfissional +
      '&' +
      'captacaoEmp=' +
      this.state.captacaoEmp +
      '&' +
      'implantacaoEmp=' +
      this.state.implantacaoEmp +
      '&' +
      'solicitacaoDeFolgaEmp=' +
      this.state.solicitacaoDeFolgaEmp +
      '&' +
      'trocaDeProfissionalEmp=' +
      this.state.trocaDeProfissionalEmp +
      '&' +
      'reclamacaoEmp=' +
      this.state.reclamacaoEmp +
      '&' +
      'elogioEmp=' +
      this.state.elogioEmp +
      '&' +
      'padIncompletoEmp=' +
      this.state.padIncompletoEmp +
      '&' +
      'visitaImprodutivaEmp=' +
      this.state.visitaImprodutivaEmp +
      '&' +
      'monitorarEmp=' +
      this.state.monitorarEmp +
      '&' +
      'pendenteEmp=' +
      this.state.pendenteEmp +
      '&' +
      'intercorrencia=' +
      this.state.intercorrencia +
      '&' +
      'clinicaInter=' +
      this.state.clinicaInter +
      '&' +
      'aphInter=' +
      this.state.aphInter +
      '&' +
      'pendenteInter=' +
      this.state.pendenteInter +
      '&' +
      'solicitacoes=' +
      this.state.solicitacoes +
      '&' +
      'recargaDeOxigenioSolic=' +
      this.state.recargaDeOxigenioSolic +
      '&' +
      'equipamentosSolic=' +
      this.state.equipamentosSolic +
      '&' +
      'matmedSolic=' +
      this.state.matmedSolic +
      '&' +
      'prontuarioSolic=' +
      this.state.prontuarioSolic +
      '&' +
      'prescricoesSolic=' +
      this.state.prescricoesSolic +
      '&' +
      'examesSolic=' +
      this.state.examesSolic +
      '&' +
      'ambulanciaSolic=' +
      this.state.ambulanciaSolic +
      '&' +
      'atendimentoDeEquipeSolic=' +
      this.state.atendimentoDeEquipeSolic +
      '&' +
      'monitorarSolic=' +
      this.state.monitorarSolic +
      '&' +
      'pendenteSolic=' +
      this.state.pendenteSolic +
      '&' +
      'avaliacao=' +
      this.state.avaliacao +
      '&' +
      'residenciaAval=' +
      this.state.residenciaAval +
      '&' +
      'hospitalAval=' +
      this.state.hospitalAval +
      '&' +
      'monitorarAval=' +
      this.state.monitorarAval +
      '&' +
      'captacaoAtivaAval=' +
      this.state.captacaoAtivaAval +
      '&' +
      'pendenteAval=' +
      this.state.pendenteAval +
      '&' +
      'implantacao=' +
      this.state.implantacao +
      '&' +
      'monitorarImpl=' +
      this.state.monitorarImpl +
      '&' +
      'pendenteImpl=' +
      this.state.pendenteImpl +
      '&' +
      'alta=' +
      this.state.alta +
      '&' +
      'hospitalizacaoAlt=' +
      this.state.hospitalizacaoAlt +
      '&' +
      'migracaoDeEmpresaAlt=' +
      this.state.migracaoDeEmpresaAlt +
      '&' +
      'obitoEmCasaAlt=' +
      this.state.obitoEmCasaAlt +
      '&' +
      'terminoDeAtendimentoAlt=' +
      this.state.terminoDeAtendimentoAlt +
      '&' +
      'atendimentoSuspensoAlt=' +
      this.state.atendimentoSuspensoAlt +
      '&' +
      'monitorarAlt=' +
      this.state.monitorarAlt +
      '&' +
      'pendenteAlt=' +
      this.state.pendenteAlt +
      '&' +
      'eCommerceSegViagem=' +
      this.state.eCommerceSegViagem +
      '&' +
      'monitorarEcsv=' +
      this.state.monitorarEcsv +
      '&' +
      'pendenteEcsv=' +
      this.state.pendenteEcsv +
      '&' +
      'farmacia=' +
      this.state.farmacia +
      '&' +
      'matMedFarm=' +
      this.state.matMedFarm +
      '&' +
      'receitaFarm=' +
      this.state.receitaFarm +
      '&' +
      'prontuarioFarm=' +
      this.state.prontuarioFarm +
      '&' +
      'romaneioManualFarm=' +
      this.state.romaneioManualFarm +
      '&' +
      'outrosFarm=' +
      this.state.outrosFarm +
      '&' +
      'monitorarFarm=' +
      this.state.monitorarFarm +
      '&' +
      'pendenteFarm=' +
      this.state.pendenteFarm +
      '&' +
      'contatoTelefonico=' +
      this.state.contatoTelefonico +
      '&' +
      'ativoContTel=' +
      this.state.ativoContTel +
      '&' +
      'receptivoContTel=' +
      this.state.receptivoContTel +
      '&' +
      'monitorarContTel=' +
      this.state.monitorarContTel +
      '&' +
      'pendenteContTel=' +
      this.state.pendenteContTel +
      '&' +
      'dtPost=' +
      this.state.dtPost +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idPacienteDiario,
      idDiarioTags,
      escalaDePlantao,
      captacaoEdp,
      implantacaoEdp,
      furoDeEscalaEdp,
      solicitacaoDeFolgaEdp,
      trocaDeProfissionalEdp,
      reclamacaoEdp,
      elogioEdp,
      recusaDeAtendimentoEdp,
      duplicidadeEdp,
      monitorarEdp,
      pendenteEdp,
      escalaMultiProfissional,
      captacaoEmp,
      implantacaoEmp,
      solicitacaoDeFolgaEmp,
      trocaDeProfissionalEmp,
      reclamacaoEmp,
      elogioEmp,
      padIncompletoEmp,
      visitaImprodutivaEmp,
      monitorarEmp,
      pendenteEmp,
      intercorrencia,
      clinicaInter,
      aphInter,
      pendenteInter,
      solicitacoes,
      recargaDeOxigenioSolic,
      equipamentosSolic,
      matmedSolic,
      prontuarioSolic,
      prescricoesSolic,
      examesSolic,
      ambulanciaSolic,
      atendimentoDeEquipeSolic,
      monitorarSolic,
      pendenteSolic,
      avaliacao,
      residenciaAval,
      hospitalAval,
      monitorarAval,
      captacaoAtivaAval,
      pendenteAval,
      implantacao,
      monitorarImpl,
      pendenteImpl,
      alta,
      hospitalizacaoAlt,
      migracaoDeEmpresaAlt,
      obitoEmCasaAlt,
      terminoDeAtendimentoAlt,
      atendimentoSuspensoAlt,
      monitorarAlt,
      pendenteAlt,
      eCommerceSegViagem,
      monitorarEcsv,
      pendenteEcsv,
      farmacia,
      matMedFarm,
      receitaFarm,
      prontuarioFarm,
      romaneioManualFarm,
      outrosFarm,
      monitorarFarm,
      pendenteFarm,
      contatoTelefonico,
      ativoContTel,
      receptivoContTel,
      monitorarContTel,
      pendenteContTel,
      dtPost,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idPacienteDiario,
      idDiarioTags,
      escalaDePlantao,
      captacaoEdp,
      implantacaoEdp,
      furoDeEscalaEdp,
      solicitacaoDeFolgaEdp,
      trocaDeProfissionalEdp,
      reclamacaoEdp,
      elogioEdp,
      recusaDeAtendimentoEdp,
      duplicidadeEdp,
      monitorarEdp,
      pendenteEdp,
      escalaMultiProfissional,
      captacaoEmp,
      implantacaoEmp,
      solicitacaoDeFolgaEmp,
      trocaDeProfissionalEmp,
      reclamacaoEmp,
      elogioEmp,
      padIncompletoEmp,
      visitaImprodutivaEmp,
      monitorarEmp,
      pendenteEmp,
      intercorrencia,
      clinicaInter,
      aphInter,
      pendenteInter,
      solicitacoes,
      recargaDeOxigenioSolic,
      equipamentosSolic,
      matmedSolic,
      prontuarioSolic,
      prescricoesSolic,
      examesSolic,
      ambulanciaSolic,
      atendimentoDeEquipeSolic,
      monitorarSolic,
      pendenteSolic,
      avaliacao,
      residenciaAval,
      hospitalAval,
      monitorarAval,
      captacaoAtivaAval,
      pendenteAval,
      implantacao,
      monitorarImpl,
      pendenteImpl,
      alta,
      hospitalizacaoAlt,
      migracaoDeEmpresaAlt,
      obitoEmCasaAlt,
      terminoDeAtendimentoAlt,
      atendimentoSuspensoAlt,
      monitorarAlt,
      pendenteAlt,
      eCommerceSegViagem,
      monitorarEcsv,
      pendenteEcsv,
      farmacia,
      matMedFarm,
      receitaFarm,
      prontuarioFarm,
      romaneioManualFarm,
      outrosFarm,
      monitorarFarm,
      pendenteFarm,
      contatoTelefonico,
      ativoContTel,
      receptivoContTel,
      monitorarContTel,
      pendenteContTel,
      dtPost,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pacienteDiarioTagsList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diario Tags</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Diario Tags</span>
              <Button id="togglerFilterPacienteDiarioTags" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pacienteDiarioTags.home.createLabel">Create a new Paciente Diario Tags</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteDiarioTags">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idPacienteDiarioLabel" for="paciente-diario-tags-idPacienteDiario">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.idPacienteDiario">Id Paciente Diario</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idPacienteDiario"
                            id="paciente-diario-tags-idPacienteDiario"
                            value={this.state.idPacienteDiario}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idDiarioTagsLabel" for="paciente-diario-tags-idDiarioTags">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.idDiarioTags">Id Diario Tags</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idDiarioTags"
                            id="paciente-diario-tags-idDiarioTags"
                            value={this.state.idDiarioTags}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="escalaDePlantaoLabel" for="paciente-diario-tags-escalaDePlantao">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.escalaDePlantao">Escala De Plantao</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="escalaDePlantao"
                            id="paciente-diario-tags-escalaDePlantao"
                            value={this.state.escalaDePlantao}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="captacaoEdpLabel" for="paciente-diario-tags-captacaoEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoEdp">Captacao Edp</Translate>
                          </Label>
                          <AvInput type="string" name="captacaoEdp" id="paciente-diario-tags-captacaoEdp" value={this.state.captacaoEdp} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="implantacaoEdpLabel" for="paciente-diario-tags-implantacaoEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.implantacaoEdp">Implantacao Edp</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="implantacaoEdp"
                            id="paciente-diario-tags-implantacaoEdp"
                            value={this.state.implantacaoEdp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="furoDeEscalaEdpLabel" for="paciente-diario-tags-furoDeEscalaEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.furoDeEscalaEdp">Furo De Escala Edp</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="furoDeEscalaEdp"
                            id="paciente-diario-tags-furoDeEscalaEdp"
                            value={this.state.furoDeEscalaEdp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="solicitacaoDeFolgaEdpLabel" for="paciente-diario-tags-solicitacaoDeFolgaEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacaoDeFolgaEdp">
                              Solicitacao De Folga Edp
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="solicitacaoDeFolgaEdp"
                            id="paciente-diario-tags-solicitacaoDeFolgaEdp"
                            value={this.state.solicitacaoDeFolgaEdp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="trocaDeProfissionalEdpLabel" for="paciente-diario-tags-trocaDeProfissionalEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.trocaDeProfissionalEdp">
                              Troca De Profissional Edp
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="trocaDeProfissionalEdp"
                            id="paciente-diario-tags-trocaDeProfissionalEdp"
                            value={this.state.trocaDeProfissionalEdp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="reclamacaoEdpLabel" for="paciente-diario-tags-reclamacaoEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.reclamacaoEdp">Reclamacao Edp</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="reclamacaoEdp"
                            id="paciente-diario-tags-reclamacaoEdp"
                            value={this.state.reclamacaoEdp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="elogioEdpLabel" for="paciente-diario-tags-elogioEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.elogioEdp">Elogio Edp</Translate>
                          </Label>
                          <AvInput type="string" name="elogioEdp" id="paciente-diario-tags-elogioEdp" value={this.state.elogioEdp} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="recusaDeAtendimentoEdpLabel" for="paciente-diario-tags-recusaDeAtendimentoEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.recusaDeAtendimentoEdp">
                              Recusa De Atendimento Edp
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="recusaDeAtendimentoEdp"
                            id="paciente-diario-tags-recusaDeAtendimentoEdp"
                            value={this.state.recusaDeAtendimentoEdp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="duplicidadeEdpLabel" for="paciente-diario-tags-duplicidadeEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.duplicidadeEdp">Duplicidade Edp</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="duplicidadeEdp"
                            id="paciente-diario-tags-duplicidadeEdp"
                            value={this.state.duplicidadeEdp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="monitorarEdpLabel" for="paciente-diario-tags-monitorarEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEdp">Monitorar Edp</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="monitorarEdp"
                            id="paciente-diario-tags-monitorarEdp"
                            value={this.state.monitorarEdp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="pendenteEdpLabel" for="paciente-diario-tags-pendenteEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEdp">Pendente Edp</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="pendenteEdp"
                            id="paciente-diario-tags-pendenteEdp"
                            value={this.state.pendenteEdp}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="escalaMultiProfissionalLabel" for="paciente-diario-tags-escalaMultiProfissional">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.escalaMultiProfissional">
                              Escala Multi Profissional
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="escalaMultiProfissional"
                            id="paciente-diario-tags-escalaMultiProfissional"
                            value={this.state.escalaMultiProfissional}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="captacaoEmpLabel" for="paciente-diario-tags-captacaoEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoEmp">Captacao Emp</Translate>
                          </Label>
                          <AvInput type="string" name="captacaoEmp" id="paciente-diario-tags-captacaoEmp" value={this.state.captacaoEmp} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="implantacaoEmpLabel" for="paciente-diario-tags-implantacaoEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.implantacaoEmp">Implantacao Emp</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="implantacaoEmp"
                            id="paciente-diario-tags-implantacaoEmp"
                            value={this.state.implantacaoEmp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="solicitacaoDeFolgaEmpLabel" for="paciente-diario-tags-solicitacaoDeFolgaEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacaoDeFolgaEmp">
                              Solicitacao De Folga Emp
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="solicitacaoDeFolgaEmp"
                            id="paciente-diario-tags-solicitacaoDeFolgaEmp"
                            value={this.state.solicitacaoDeFolgaEmp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="trocaDeProfissionalEmpLabel" for="paciente-diario-tags-trocaDeProfissionalEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.trocaDeProfissionalEmp">
                              Troca De Profissional Emp
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="trocaDeProfissionalEmp"
                            id="paciente-diario-tags-trocaDeProfissionalEmp"
                            value={this.state.trocaDeProfissionalEmp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="reclamacaoEmpLabel" for="paciente-diario-tags-reclamacaoEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.reclamacaoEmp">Reclamacao Emp</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="reclamacaoEmp"
                            id="paciente-diario-tags-reclamacaoEmp"
                            value={this.state.reclamacaoEmp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="elogioEmpLabel" for="paciente-diario-tags-elogioEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.elogioEmp">Elogio Emp</Translate>
                          </Label>
                          <AvInput type="string" name="elogioEmp" id="paciente-diario-tags-elogioEmp" value={this.state.elogioEmp} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="padIncompletoEmpLabel" for="paciente-diario-tags-padIncompletoEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.padIncompletoEmp">Pad Incompleto Emp</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="padIncompletoEmp"
                            id="paciente-diario-tags-padIncompletoEmp"
                            value={this.state.padIncompletoEmp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="visitaImprodutivaEmpLabel" for="paciente-diario-tags-visitaImprodutivaEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.visitaImprodutivaEmp">Visita Improdutiva Emp</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="visitaImprodutivaEmp"
                            id="paciente-diario-tags-visitaImprodutivaEmp"
                            value={this.state.visitaImprodutivaEmp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="monitorarEmpLabel" for="paciente-diario-tags-monitorarEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEmp">Monitorar Emp</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="monitorarEmp"
                            id="paciente-diario-tags-monitorarEmp"
                            value={this.state.monitorarEmp}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="pendenteEmpLabel" for="paciente-diario-tags-pendenteEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEmp">Pendente Emp</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="pendenteEmp"
                            id="paciente-diario-tags-pendenteEmp"
                            value={this.state.pendenteEmp}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="intercorrenciaLabel" for="paciente-diario-tags-intercorrencia">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.intercorrencia">Intercorrencia</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="intercorrencia"
                            id="paciente-diario-tags-intercorrencia"
                            value={this.state.intercorrencia}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="clinicaInterLabel" for="paciente-diario-tags-clinicaInter">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.clinicaInter">Clinica Inter</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="clinicaInter"
                            id="paciente-diario-tags-clinicaInter"
                            value={this.state.clinicaInter}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="aphInterLabel" for="paciente-diario-tags-aphInter">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.aphInter">Aph Inter</Translate>
                          </Label>
                          <AvInput type="string" name="aphInter" id="paciente-diario-tags-aphInter" value={this.state.aphInter} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="pendenteInterLabel" for="paciente-diario-tags-pendenteInter">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteInter">Pendente Inter</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="pendenteInter"
                            id="paciente-diario-tags-pendenteInter"
                            value={this.state.pendenteInter}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="solicitacoesLabel" for="paciente-diario-tags-solicitacoes">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacoes">Solicitacoes</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="solicitacoes"
                            id="paciente-diario-tags-solicitacoes"
                            value={this.state.solicitacoes}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="recargaDeOxigenioSolicLabel" for="paciente-diario-tags-recargaDeOxigenioSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.recargaDeOxigenioSolic">
                              Recarga De Oxigenio Solic
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="recargaDeOxigenioSolic"
                            id="paciente-diario-tags-recargaDeOxigenioSolic"
                            value={this.state.recargaDeOxigenioSolic}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="equipamentosSolicLabel" for="paciente-diario-tags-equipamentosSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.equipamentosSolic">Equipamentos Solic</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="equipamentosSolic"
                            id="paciente-diario-tags-equipamentosSolic"
                            value={this.state.equipamentosSolic}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="matmedSolicLabel" for="paciente-diario-tags-matmedSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.matmedSolic">Matmed Solic</Translate>
                          </Label>
                          <AvInput type="string" name="matmedSolic" id="paciente-diario-tags-matmedSolic" value={this.state.matmedSolic} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="prontuarioSolicLabel" for="paciente-diario-tags-prontuarioSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.prontuarioSolic">Prontuario Solic</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="prontuarioSolic"
                            id="paciente-diario-tags-prontuarioSolic"
                            value={this.state.prontuarioSolic}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="prescricoesSolicLabel" for="paciente-diario-tags-prescricoesSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.prescricoesSolic">Prescricoes Solic</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="prescricoesSolic"
                            id="paciente-diario-tags-prescricoesSolic"
                            value={this.state.prescricoesSolic}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="examesSolicLabel" for="paciente-diario-tags-examesSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.examesSolic">Exames Solic</Translate>
                          </Label>
                          <AvInput type="string" name="examesSolic" id="paciente-diario-tags-examesSolic" value={this.state.examesSolic} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ambulanciaSolicLabel" for="paciente-diario-tags-ambulanciaSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.ambulanciaSolic">Ambulancia Solic</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="ambulanciaSolic"
                            id="paciente-diario-tags-ambulanciaSolic"
                            value={this.state.ambulanciaSolic}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="atendimentoDeEquipeSolicLabel" for="paciente-diario-tags-atendimentoDeEquipeSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.atendimentoDeEquipeSolic">
                              Atendimento De Equipe Solic
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="atendimentoDeEquipeSolic"
                            id="paciente-diario-tags-atendimentoDeEquipeSolic"
                            value={this.state.atendimentoDeEquipeSolic}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="monitorarSolicLabel" for="paciente-diario-tags-monitorarSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarSolic">Monitorar Solic</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="monitorarSolic"
                            id="paciente-diario-tags-monitorarSolic"
                            value={this.state.monitorarSolic}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="pendenteSolicLabel" for="paciente-diario-tags-pendenteSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteSolic">Pendente Solic</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="pendenteSolic"
                            id="paciente-diario-tags-pendenteSolic"
                            value={this.state.pendenteSolic}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="avaliacaoLabel" for="paciente-diario-tags-avaliacao">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.avaliacao">Avaliacao</Translate>
                          </Label>
                          <AvInput type="string" name="avaliacao" id="paciente-diario-tags-avaliacao" value={this.state.avaliacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="residenciaAvalLabel" for="paciente-diario-tags-residenciaAval">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.residenciaAval">Residencia Aval</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="residenciaAval"
                            id="paciente-diario-tags-residenciaAval"
                            value={this.state.residenciaAval}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="hospitalAvalLabel" for="paciente-diario-tags-hospitalAval">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.hospitalAval">Hospital Aval</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="hospitalAval"
                            id="paciente-diario-tags-hospitalAval"
                            value={this.state.hospitalAval}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="monitorarAvalLabel" for="paciente-diario-tags-monitorarAval">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarAval">Monitorar Aval</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="monitorarAval"
                            id="paciente-diario-tags-monitorarAval"
                            value={this.state.monitorarAval}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="captacaoAtivaAvalLabel" for="paciente-diario-tags-captacaoAtivaAval">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoAtivaAval">Captacao Ativa Aval</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="captacaoAtivaAval"
                            id="paciente-diario-tags-captacaoAtivaAval"
                            value={this.state.captacaoAtivaAval}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="pendenteAvalLabel" for="paciente-diario-tags-pendenteAval">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteAval">Pendente Aval</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="pendenteAval"
                            id="paciente-diario-tags-pendenteAval"
                            value={this.state.pendenteAval}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="implantacaoLabel" for="paciente-diario-tags-implantacao">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.implantacao">Implantacao</Translate>
                          </Label>
                          <AvInput type="string" name="implantacao" id="paciente-diario-tags-implantacao" value={this.state.implantacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="monitorarImplLabel" for="paciente-diario-tags-monitorarImpl">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarImpl">Monitorar Impl</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="monitorarImpl"
                            id="paciente-diario-tags-monitorarImpl"
                            value={this.state.monitorarImpl}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="pendenteImplLabel" for="paciente-diario-tags-pendenteImpl">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteImpl">Pendente Impl</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="pendenteImpl"
                            id="paciente-diario-tags-pendenteImpl"
                            value={this.state.pendenteImpl}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="altaLabel" for="paciente-diario-tags-alta">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.alta">Alta</Translate>
                          </Label>
                          <AvInput type="string" name="alta" id="paciente-diario-tags-alta" value={this.state.alta} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="hospitalizacaoAltLabel" for="paciente-diario-tags-hospitalizacaoAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.hospitalizacaoAlt">Hospitalizacao Alt</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="hospitalizacaoAlt"
                            id="paciente-diario-tags-hospitalizacaoAlt"
                            value={this.state.hospitalizacaoAlt}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="migracaoDeEmpresaAltLabel" for="paciente-diario-tags-migracaoDeEmpresaAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.migracaoDeEmpresaAlt">Migracao De Empresa Alt</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="migracaoDeEmpresaAlt"
                            id="paciente-diario-tags-migracaoDeEmpresaAlt"
                            value={this.state.migracaoDeEmpresaAlt}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="obitoEmCasaAltLabel" for="paciente-diario-tags-obitoEmCasaAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.obitoEmCasaAlt">Obito Em Casa Alt</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="obitoEmCasaAlt"
                            id="paciente-diario-tags-obitoEmCasaAlt"
                            value={this.state.obitoEmCasaAlt}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="terminoDeAtendimentoAltLabel" for="paciente-diario-tags-terminoDeAtendimentoAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.terminoDeAtendimentoAlt">
                              Termino De Atendimento Alt
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="terminoDeAtendimentoAlt"
                            id="paciente-diario-tags-terminoDeAtendimentoAlt"
                            value={this.state.terminoDeAtendimentoAlt}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="atendimentoSuspensoAltLabel" for="paciente-diario-tags-atendimentoSuspensoAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.atendimentoSuspensoAlt">
                              Atendimento Suspenso Alt
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="atendimentoSuspensoAlt"
                            id="paciente-diario-tags-atendimentoSuspensoAlt"
                            value={this.state.atendimentoSuspensoAlt}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="monitorarAltLabel" for="paciente-diario-tags-monitorarAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarAlt">Monitorar Alt</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="monitorarAlt"
                            id="paciente-diario-tags-monitorarAlt"
                            value={this.state.monitorarAlt}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="pendenteAltLabel" for="paciente-diario-tags-pendenteAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteAlt">Pendente Alt</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="pendenteAlt"
                            id="paciente-diario-tags-pendenteAlt"
                            value={this.state.pendenteAlt}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="eCommerceSegViagemLabel" for="paciente-diario-tags-eCommerceSegViagem">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.eCommerceSegViagem">E Commerce Seg Viagem</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="eCommerceSegViagem"
                            id="paciente-diario-tags-eCommerceSegViagem"
                            value={this.state.eCommerceSegViagem}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="monitorarEcsvLabel" for="paciente-diario-tags-monitorarEcsv">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEcsv">Monitorar Ecsv</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="monitorarEcsv"
                            id="paciente-diario-tags-monitorarEcsv"
                            value={this.state.monitorarEcsv}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="pendenteEcsvLabel" for="paciente-diario-tags-pendenteEcsv">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEcsv">Pendente Ecsv</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="pendenteEcsv"
                            id="paciente-diario-tags-pendenteEcsv"
                            value={this.state.pendenteEcsv}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="farmaciaLabel" for="paciente-diario-tags-farmacia">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.farmacia">Farmacia</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="farmacia"
                            id="paciente-diario-tags-farmacia"
                            value={this.state.farmacia}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="matMedFarmLabel" for="paciente-diario-tags-matMedFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.matMedFarm">Mat Med Farm</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="matMedFarm"
                            id="paciente-diario-tags-matMedFarm"
                            value={this.state.matMedFarm}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="receitaFarmLabel" for="paciente-diario-tags-receitaFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.receitaFarm">Receita Farm</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="receitaFarm"
                            id="paciente-diario-tags-receitaFarm"
                            value={this.state.receitaFarm}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="prontuarioFarmLabel" for="paciente-diario-tags-prontuarioFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.prontuarioFarm">Prontuario Farm</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="prontuarioFarm"
                            id="paciente-diario-tags-prontuarioFarm"
                            value={this.state.prontuarioFarm}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="romaneioManualFarmLabel" for="paciente-diario-tags-romaneioManualFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.romaneioManualFarm">Romaneio Manual Farm</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="romaneioManualFarm"
                            id="paciente-diario-tags-romaneioManualFarm"
                            value={this.state.romaneioManualFarm}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="outrosFarmLabel" for="paciente-diario-tags-outrosFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.outrosFarm">Outros Farm</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="outrosFarm"
                            id="paciente-diario-tags-outrosFarm"
                            value={this.state.outrosFarm}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="monitorarFarmLabel" for="paciente-diario-tags-monitorarFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarFarm">Monitorar Farm</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="monitorarFarm"
                            id="paciente-diario-tags-monitorarFarm"
                            value={this.state.monitorarFarm}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="pendenteFarmLabel" for="paciente-diario-tags-pendenteFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteFarm">Pendente Farm</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="pendenteFarm"
                            id="paciente-diario-tags-pendenteFarm"
                            value={this.state.pendenteFarm}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="contatoTelefonicoLabel" for="paciente-diario-tags-contatoTelefonico">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.contatoTelefonico">Contato Telefonico</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="contatoTelefonico"
                            id="paciente-diario-tags-contatoTelefonico"
                            value={this.state.contatoTelefonico}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoContTelLabel" for="paciente-diario-tags-ativoContTel">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.ativoContTel">Ativo Cont Tel</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="ativoContTel"
                            id="paciente-diario-tags-ativoContTel"
                            value={this.state.ativoContTel}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="receptivoContTelLabel" for="paciente-diario-tags-receptivoContTel">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.receptivoContTel">Receptivo Cont Tel</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="receptivoContTel"
                            id="paciente-diario-tags-receptivoContTel"
                            value={this.state.receptivoContTel}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="monitorarContTelLabel" for="paciente-diario-tags-monitorarContTel">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarContTel">Monitorar Cont Tel</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="monitorarContTel"
                            id="paciente-diario-tags-monitorarContTel"
                            value={this.state.monitorarContTel}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="pendenteContTelLabel" for="paciente-diario-tags-pendenteContTel">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteContTel">Pendente Cont Tel</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="pendenteContTel"
                            id="paciente-diario-tags-pendenteContTel"
                            value={this.state.pendenteContTel}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dtPostLabel" for="paciente-diario-tags-dtPost">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.dtPost">Dt Post</Translate>
                          </Label>
                          <AvInput
                            id="paciente-diario-tags-dtPost"
                            type="datetime-local"
                            className="form-control"
                            name="dtPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dtPost ? convertDateTimeFromServer(this.state.dtPost) : null}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
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

              {pacienteDiarioTagsList && pacienteDiarioTagsList.length > 0 ? (
                <Table responsive aria-describedby="paciente-diario-tags-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPacienteDiario')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.idPacienteDiario">Id Paciente Diario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idDiarioTags')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.idDiarioTags">Id Diario Tags</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('escalaDePlantao')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.escalaDePlantao">Escala De Plantao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('captacaoEdp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoEdp">Captacao Edp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('implantacaoEdp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.implantacaoEdp">Implantacao Edp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('furoDeEscalaEdp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.furoDeEscalaEdp">Furo De Escala Edp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('solicitacaoDeFolgaEdp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacaoDeFolgaEdp">Solicitacao De Folga Edp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('trocaDeProfissionalEdp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.trocaDeProfissionalEdp">Troca De Profissional Edp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('reclamacaoEdp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.reclamacaoEdp">Reclamacao Edp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('elogioEdp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.elogioEdp">Elogio Edp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('recusaDeAtendimentoEdp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.recusaDeAtendimentoEdp">Recusa De Atendimento Edp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('duplicidadeEdp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.duplicidadeEdp">Duplicidade Edp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('monitorarEdp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEdp">Monitorar Edp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('pendenteEdp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEdp">Pendente Edp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('escalaMultiProfissional')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.escalaMultiProfissional">
                          Escala Multi Profissional
                        </Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('captacaoEmp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoEmp">Captacao Emp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('implantacaoEmp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.implantacaoEmp">Implantacao Emp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('solicitacaoDeFolgaEmp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacaoDeFolgaEmp">Solicitacao De Folga Emp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('trocaDeProfissionalEmp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.trocaDeProfissionalEmp">Troca De Profissional Emp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('reclamacaoEmp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.reclamacaoEmp">Reclamacao Emp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('elogioEmp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.elogioEmp">Elogio Emp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('padIncompletoEmp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.padIncompletoEmp">Pad Incompleto Emp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('visitaImprodutivaEmp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.visitaImprodutivaEmp">Visita Improdutiva Emp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('monitorarEmp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEmp">Monitorar Emp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('pendenteEmp')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEmp">Pendente Emp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('intercorrencia')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.intercorrencia">Intercorrencia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('clinicaInter')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.clinicaInter">Clinica Inter</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('aphInter')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.aphInter">Aph Inter</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('pendenteInter')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteInter">Pendente Inter</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('solicitacoes')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacoes">Solicitacoes</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('recargaDeOxigenioSolic')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.recargaDeOxigenioSolic">Recarga De Oxigenio Solic</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('equipamentosSolic')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.equipamentosSolic">Equipamentos Solic</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('matmedSolic')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.matmedSolic">Matmed Solic</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('prontuarioSolic')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.prontuarioSolic">Prontuario Solic</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('prescricoesSolic')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.prescricoesSolic">Prescricoes Solic</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('examesSolic')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.examesSolic">Exames Solic</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ambulanciaSolic')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.ambulanciaSolic">Ambulancia Solic</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('atendimentoDeEquipeSolic')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.atendimentoDeEquipeSolic">
                          Atendimento De Equipe Solic
                        </Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('monitorarSolic')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarSolic">Monitorar Solic</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('pendenteSolic')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteSolic">Pendente Solic</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('avaliacao')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.avaliacao">Avaliacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('residenciaAval')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.residenciaAval">Residencia Aval</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('hospitalAval')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.hospitalAval">Hospital Aval</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('monitorarAval')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarAval">Monitorar Aval</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('captacaoAtivaAval')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoAtivaAval">Captacao Ativa Aval</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('pendenteAval')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteAval">Pendente Aval</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('implantacao')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.implantacao">Implantacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('monitorarImpl')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarImpl">Monitorar Impl</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('pendenteImpl')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteImpl">Pendente Impl</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('alta')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.alta">Alta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('hospitalizacaoAlt')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.hospitalizacaoAlt">Hospitalizacao Alt</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('migracaoDeEmpresaAlt')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.migracaoDeEmpresaAlt">Migracao De Empresa Alt</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('obitoEmCasaAlt')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.obitoEmCasaAlt">Obito Em Casa Alt</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('terminoDeAtendimentoAlt')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.terminoDeAtendimentoAlt">
                          Termino De Atendimento Alt
                        </Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('atendimentoSuspensoAlt')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.atendimentoSuspensoAlt">Atendimento Suspenso Alt</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('monitorarAlt')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarAlt">Monitorar Alt</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('pendenteAlt')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteAlt">Pendente Alt</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('eCommerceSegViagem')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.eCommerceSegViagem">E Commerce Seg Viagem</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('monitorarEcsv')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEcsv">Monitorar Ecsv</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('pendenteEcsv')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEcsv">Pendente Ecsv</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('farmacia')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.farmacia">Farmacia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('matMedFarm')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.matMedFarm">Mat Med Farm</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('receitaFarm')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.receitaFarm">Receita Farm</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('prontuarioFarm')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.prontuarioFarm">Prontuario Farm</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('romaneioManualFarm')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.romaneioManualFarm">Romaneio Manual Farm</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('outrosFarm')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.outrosFarm">Outros Farm</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('monitorarFarm')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarFarm">Monitorar Farm</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('pendenteFarm')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteFarm">Pendente Farm</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('contatoTelefonico')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.contatoTelefonico">Contato Telefonico</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativoContTel')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.ativoContTel">Ativo Cont Tel</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('receptivoContTel')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.receptivoContTel">Receptivo Cont Tel</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('monitorarContTel')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarContTel">Monitorar Cont Tel</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('pendenteContTel')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteContTel">Pendente Cont Tel</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dtPost')}>
                        <Translate contentKey="generadorApp.pacienteDiarioTags.dtPost">Dt Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteDiarioTagsList.map((pacienteDiarioTags, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacienteDiarioTags.id}`} color="link" size="sm">
                            {pacienteDiarioTags.id}
                          </Button>
                        </td>

                        <td>{pacienteDiarioTags.idPacienteDiario}</td>

                        <td>{pacienteDiarioTags.idDiarioTags}</td>

                        <td>{pacienteDiarioTags.escalaDePlantao}</td>

                        <td>{pacienteDiarioTags.captacaoEdp}</td>

                        <td>{pacienteDiarioTags.implantacaoEdp}</td>

                        <td>{pacienteDiarioTags.furoDeEscalaEdp}</td>

                        <td>{pacienteDiarioTags.solicitacaoDeFolgaEdp}</td>

                        <td>{pacienteDiarioTags.trocaDeProfissionalEdp}</td>

                        <td>{pacienteDiarioTags.reclamacaoEdp}</td>

                        <td>{pacienteDiarioTags.elogioEdp}</td>

                        <td>{pacienteDiarioTags.recusaDeAtendimentoEdp}</td>

                        <td>{pacienteDiarioTags.duplicidadeEdp}</td>

                        <td>{pacienteDiarioTags.monitorarEdp}</td>

                        <td>{pacienteDiarioTags.pendenteEdp}</td>

                        <td>{pacienteDiarioTags.escalaMultiProfissional}</td>

                        <td>{pacienteDiarioTags.captacaoEmp}</td>

                        <td>{pacienteDiarioTags.implantacaoEmp}</td>

                        <td>{pacienteDiarioTags.solicitacaoDeFolgaEmp}</td>

                        <td>{pacienteDiarioTags.trocaDeProfissionalEmp}</td>

                        <td>{pacienteDiarioTags.reclamacaoEmp}</td>

                        <td>{pacienteDiarioTags.elogioEmp}</td>

                        <td>{pacienteDiarioTags.padIncompletoEmp}</td>

                        <td>{pacienteDiarioTags.visitaImprodutivaEmp}</td>

                        <td>{pacienteDiarioTags.monitorarEmp}</td>

                        <td>{pacienteDiarioTags.pendenteEmp}</td>

                        <td>{pacienteDiarioTags.intercorrencia}</td>

                        <td>{pacienteDiarioTags.clinicaInter}</td>

                        <td>{pacienteDiarioTags.aphInter}</td>

                        <td>{pacienteDiarioTags.pendenteInter}</td>

                        <td>{pacienteDiarioTags.solicitacoes}</td>

                        <td>{pacienteDiarioTags.recargaDeOxigenioSolic}</td>

                        <td>{pacienteDiarioTags.equipamentosSolic}</td>

                        <td>{pacienteDiarioTags.matmedSolic}</td>

                        <td>{pacienteDiarioTags.prontuarioSolic}</td>

                        <td>{pacienteDiarioTags.prescricoesSolic}</td>

                        <td>{pacienteDiarioTags.examesSolic}</td>

                        <td>{pacienteDiarioTags.ambulanciaSolic}</td>

                        <td>{pacienteDiarioTags.atendimentoDeEquipeSolic}</td>

                        <td>{pacienteDiarioTags.monitorarSolic}</td>

                        <td>{pacienteDiarioTags.pendenteSolic}</td>

                        <td>{pacienteDiarioTags.avaliacao}</td>

                        <td>{pacienteDiarioTags.residenciaAval}</td>

                        <td>{pacienteDiarioTags.hospitalAval}</td>

                        <td>{pacienteDiarioTags.monitorarAval}</td>

                        <td>{pacienteDiarioTags.captacaoAtivaAval}</td>

                        <td>{pacienteDiarioTags.pendenteAval}</td>

                        <td>{pacienteDiarioTags.implantacao}</td>

                        <td>{pacienteDiarioTags.monitorarImpl}</td>

                        <td>{pacienteDiarioTags.pendenteImpl}</td>

                        <td>{pacienteDiarioTags.alta}</td>

                        <td>{pacienteDiarioTags.hospitalizacaoAlt}</td>

                        <td>{pacienteDiarioTags.migracaoDeEmpresaAlt}</td>

                        <td>{pacienteDiarioTags.obitoEmCasaAlt}</td>

                        <td>{pacienteDiarioTags.terminoDeAtendimentoAlt}</td>

                        <td>{pacienteDiarioTags.atendimentoSuspensoAlt}</td>

                        <td>{pacienteDiarioTags.monitorarAlt}</td>

                        <td>{pacienteDiarioTags.pendenteAlt}</td>

                        <td>{pacienteDiarioTags.eCommerceSegViagem}</td>

                        <td>{pacienteDiarioTags.monitorarEcsv}</td>

                        <td>{pacienteDiarioTags.pendenteEcsv}</td>

                        <td>{pacienteDiarioTags.farmacia}</td>

                        <td>{pacienteDiarioTags.matMedFarm}</td>

                        <td>{pacienteDiarioTags.receitaFarm}</td>

                        <td>{pacienteDiarioTags.prontuarioFarm}</td>

                        <td>{pacienteDiarioTags.romaneioManualFarm}</td>

                        <td>{pacienteDiarioTags.outrosFarm}</td>

                        <td>{pacienteDiarioTags.monitorarFarm}</td>

                        <td>{pacienteDiarioTags.pendenteFarm}</td>

                        <td>{pacienteDiarioTags.contatoTelefonico}</td>

                        <td>{pacienteDiarioTags.ativoContTel}</td>

                        <td>{pacienteDiarioTags.receptivoContTel}</td>

                        <td>{pacienteDiarioTags.monitorarContTel}</td>

                        <td>{pacienteDiarioTags.pendenteContTel}</td>

                        <td>
                          <TextFormat type="date" value={pacienteDiarioTags.dtPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacienteDiarioTags.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteDiarioTags.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteDiarioTags.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.pacienteDiarioTags.home.notFound">No Paciente Diario Tags found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteDiarioTagsList && pacienteDiarioTagsList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacienteDiarioTags, ...storeState }: IRootState) => ({
  pacienteDiarioTagsList: pacienteDiarioTags.entities,
  totalItems: pacienteDiarioTags.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiarioTags);
