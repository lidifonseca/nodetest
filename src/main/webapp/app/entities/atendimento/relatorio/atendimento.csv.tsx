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
import { getAtendimentoState, IAtendimentoBaseState, getEntitiesExport } from '../atendimento.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';
import { IStatusAtendimento } from 'app/shared/model/status-atendimento.model';
import { getEntities as getStatusAtendimentos } from 'app/entities/status-atendimento/status-atendimento.reducer';
import { IPeriodo } from 'app/shared/model/periodo.model';
import { getEntities as getPeriodos } from 'app/entities/periodo/periodo.reducer';
import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';

export interface IAtendimentoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoState extends IAtendimentoBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class Atendimento extends React.Component<IAtendimentoProps, IAtendimentoState> {
  private myFormRef: any;

  constructor(props: IAtendimentoProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getAtendimentoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getPacientes();
    this.props.getOperadoras();
    this.props.getEspecialidades();
    this.props.getPadItems();
    this.props.getStatusAtendimentos();
    this.props.getPeriodos();
    this.props.getCidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        idFranquia: '',
        idProfissional: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        uf: '',
        latitude: '',
        longitude: '',
        dataAgenda: '',
        horario: '',
        dataChegada: '',
        latitudeChegada: '',
        longitudeChegada: '',
        dataSaida: '',
        latitudeSaida: '',
        longitudeSaida: '',
        evolucao: '',
        observacao: '',
        intercorrencia: '',
        avaliacao: '',
        aceito: '',
        motivo: '',
        valor: '',
        ordemAtendimento: '',
        ativo: '',
        dataForaHora: '',
        idUsuarioCancelamento: '',
        dataCancelamento: '',
        tipoUsuarioCancelamento: '',
        confidencialProfissional: '',
        confidencialPaciente: '',
        atendimentoAceite: '',
        atendimentoAssinaturas: '',
        atendimentoAtividades: '',
        unidade: '',
        paciente: '',
        operadora: '',
        especialidade: '',
        padItem: '',
        statusAtendimento: '',
        periodo: '',
        cidade: ''
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
      'idFranquia=' +
      this.state.idFranquia +
      '&' +
      'idProfissional=' +
      this.state.idProfissional +
      '&' +
      'cep=' +
      this.state.cep +
      '&' +
      'endereco=' +
      this.state.endereco +
      '&' +
      'numero=' +
      this.state.numero +
      '&' +
      'complemento=' +
      this.state.complemento +
      '&' +
      'bairro=' +
      this.state.bairro +
      '&' +
      'uf=' +
      this.state.uf +
      '&' +
      'latitude=' +
      this.state.latitude +
      '&' +
      'longitude=' +
      this.state.longitude +
      '&' +
      'dataAgenda=' +
      this.state.dataAgenda +
      '&' +
      'horario=' +
      this.state.horario +
      '&' +
      'dataChegada=' +
      this.state.dataChegada +
      '&' +
      'latitudeChegada=' +
      this.state.latitudeChegada +
      '&' +
      'longitudeChegada=' +
      this.state.longitudeChegada +
      '&' +
      'dataSaida=' +
      this.state.dataSaida +
      '&' +
      'latitudeSaida=' +
      this.state.latitudeSaida +
      '&' +
      'longitudeSaida=' +
      this.state.longitudeSaida +
      '&' +
      'evolucao=' +
      this.state.evolucao +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      'intercorrencia=' +
      this.state.intercorrencia +
      '&' +
      'avaliacao=' +
      this.state.avaliacao +
      '&' +
      'aceito=' +
      this.state.aceito +
      '&' +
      'motivo=' +
      this.state.motivo +
      '&' +
      'valor=' +
      this.state.valor +
      '&' +
      'ordemAtendimento=' +
      this.state.ordemAtendimento +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataForaHora=' +
      this.state.dataForaHora +
      '&' +
      'idUsuarioCancelamento=' +
      this.state.idUsuarioCancelamento +
      '&' +
      'dataCancelamento=' +
      this.state.dataCancelamento +
      '&' +
      'tipoUsuarioCancelamento=' +
      this.state.tipoUsuarioCancelamento +
      '&' +
      'confidencialProfissional=' +
      this.state.confidencialProfissional +
      '&' +
      'confidencialPaciente=' +
      this.state.confidencialPaciente +
      '&' +
      'atendimentoAceite=' +
      this.state.atendimentoAceite +
      '&' +
      'atendimentoAssinaturas=' +
      this.state.atendimentoAssinaturas +
      '&' +
      'atendimentoAtividades=' +
      this.state.atendimentoAtividades +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      'paciente=' +
      this.state.paciente +
      '&' +
      'operadora=' +
      this.state.operadora +
      '&' +
      'especialidade=' +
      this.state.especialidade +
      '&' +
      'padItem=' +
      this.state.padItem +
      '&' +
      'statusAtendimento=' +
      this.state.statusAtendimento +
      '&' +
      'periodo=' +
      this.state.periodo +
      '&' +
      'cidade=' +
      this.state.cidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idFranquia,
      idProfissional,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      uf,
      latitude,
      longitude,
      dataAgenda,
      horario,
      dataChegada,
      latitudeChegada,
      longitudeChegada,
      dataSaida,
      latitudeSaida,
      longitudeSaida,
      evolucao,
      observacao,
      intercorrencia,
      avaliacao,
      aceito,
      motivo,
      valor,
      ordemAtendimento,
      ativo,
      dataForaHora,
      idUsuarioCancelamento,
      dataCancelamento,
      tipoUsuarioCancelamento,
      confidencialProfissional,
      confidencialPaciente,
      atendimentoAceite,
      atendimentoAssinaturas,
      atendimentoAtividades,
      unidade,
      paciente,
      operadora,
      especialidade,
      padItem,
      statusAtendimento,
      periodo,
      cidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      idFranquia,
      idProfissional,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      uf,
      latitude,
      longitude,
      dataAgenda,
      horario,
      dataChegada,
      latitudeChegada,
      longitudeChegada,
      dataSaida,
      latitudeSaida,
      longitudeSaida,
      evolucao,
      observacao,
      intercorrencia,
      avaliacao,
      aceito,
      motivo,
      valor,
      ordemAtendimento,
      ativo,
      dataForaHora,
      idUsuarioCancelamento,
      dataCancelamento,
      tipoUsuarioCancelamento,
      confidencialProfissional,
      confidencialPaciente,
      atendimentoAceite,
      atendimentoAssinaturas,
      atendimentoAtividades,
      unidade,
      paciente,
      operadora,
      especialidade,
      padItem,
      statusAtendimento,
      periodo,
      cidade,
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

const mapStateToProps = ({ atendimento, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  pacientes: storeState.paciente.entities,
  operadoras: storeState.operadora.entities,
  especialidades: storeState.especialidade.entities,
  padItems: storeState.padItem.entities,
  statusAtendimentos: storeState.statusAtendimento.entities,
  periodos: storeState.periodo.entities,
  cidades: storeState.cidade.entities,
  atendimentoList: atendimento.entities,
  totalItems: atendimento.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getPacientes,
  getOperadoras,
  getEspecialidades,
  getPadItems,
  getStatusAtendimentos,
  getPeriodos,
  getCidades,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Atendimento);
