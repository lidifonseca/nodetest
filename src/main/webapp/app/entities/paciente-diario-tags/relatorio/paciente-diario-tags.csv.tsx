/* eslint-disable require-await */

/* eslint complexity: ["error", 100] */
import React from 'react';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { connect } from 'react-redux';
import { CSVDownload } from 'react-csv';
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
import { getPacienteDiarioTagsState, IPacienteDiarioTagsBaseState, getEntitiesExport } from '../paciente-diario-tags.reducer';
import { IPacienteDiarioTags } from 'app/shared/model/paciente-diario-tags.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteDiarioTagsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteDiarioTagsState extends IPacienteDiarioTagsBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class PacienteDiarioTags extends React.Component<IPacienteDiarioTagsProps, IPacienteDiarioTagsState> {
  private myFormRef: any;

  constructor(props: IPacienteDiarioTagsProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacienteDiarioTagsState(this.props.location)
    };
  }

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
    this.props.getEntitiesExport(
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

  confirmExport() {}
  //  async confirmExport() {
  //    /* eslint-disable require-await */
  //    const result = await this.getEntities();
  //    this.setState({
  //      exportData: result['value']['data']
  //    })
  //  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    return this.state.exportData !== null ? (
      <div>
        <CSVDownload filename={'my-file.csv'} data={this.state.exportData} target="_blank" />
        {this.props.history.goBack()}
      </div>
    ) : (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.paciente.delete.question">
          <Translate contentKey="generadorApp.paciente.delete.question">Are you sure you want to delete this Paciente?</Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-paciente" color="danger" onClick={this.confirmExport}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Export CSV</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ pacienteDiarioTags, ...storeState }: IRootState) => ({
  pacienteDiarioTagsList: pacienteDiarioTags.entities,
  totalItems: pacienteDiarioTags.totalItems
});

const mapDispatchToProps = {
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiarioTags);
