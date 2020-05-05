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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
import { getPacienteState, IPacienteBaseState, getEntitiesExport } from '../paciente.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';
import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';
import { IGrauParentesco } from 'app/shared/model/grau-parentesco.model';
import { getEntities as getGrauParentescos } from 'app/entities/grau-parentesco/grau-parentesco.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';
import { IPacienteHospital } from 'app/shared/model/paciente-hospital.model';
import { getEntities as getPacienteHospitals } from 'app/entities/paciente-hospital/paciente-hospital.reducer';

export interface IPacienteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteState extends IPacienteBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class Paciente extends React.Component<IPacienteProps, IPacienteState> {
  private myFormRef: any;

  constructor(props: IPacienteProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacienteState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getFranquias();
    this.props.getCidades();
    this.props.getGrauParentescos();
    this.props.getProfissionals();
    this.props.getPacienteHospitals();
  }

  cancelCourse = () => {
    this.setState(
      {
        senha: '',
        nome: '',
        email: '',
        cpf: '',
        rg: '',
        registro: '',
        nascimento: '',
        sexo: '',
        telefone: '',
        telefone2: '',
        celular: '',
        celular1: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        uf: '',
        latitude: '',
        longitude: '',
        responsavelFamiliar: '',
        emailFamiliar: '',
        cpfFamiliar: '',
        rgFamiliar: '',
        nascimentoFamiliar: '',
        sexoFamiliar: '',
        telefoneFamiliar: '',
        telefone2Familiar: '',
        celularFamiliar: '',
        celular2Familiar: '',
        cepFamiliar: '',
        enderecoFamiliar: '',
        numeroFamiliar: '',
        complementoFamiliar: '',
        bairroFamiliar: '',
        ufFamiliar: '',
        latitudeFamiliar: '',
        longitudeFamiliar: '',
        observacao: '',
        aph: '',
        nivelComplexidade: '',
        passagemPs: '',
        obsPs: '',
        passagemInternacao: '',
        obsInternacao: '',
        custoTotal: '',
        observacaoFamiliar: '',
        mesmoEndereco: '',
        acessoFamiliar: '',
        comResponsavel: '',
        cadastroCompleto: '',
        ativo: '',
        detalhes: '',
        liminar: '',
        expoToken: '',
        senhaChat: '',
        atendimento: '',
        atendimentoAssinaturas: '',
        diario: '',
        pacienteDadosCartao: '',
        pacienteDiagnostico: '',
        pacienteDiario: '',
        pacienteEnqueteApp: '',
        pacienteOperadora: '',
        pacientePedido: '',
        pacientePush: '',
        pad: '',
        unidade: '',
        franquia: '',
        cidade: '',
        cidadeFamiliar: '',
        grauParentesco: '',
        profissionalPref: '',
        tipohospital: ''
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
      'senha=' +
      this.state.senha +
      '&' +
      'nome=' +
      this.state.nome +
      '&' +
      'email=' +
      this.state.email +
      '&' +
      'cpf=' +
      this.state.cpf +
      '&' +
      'rg=' +
      this.state.rg +
      '&' +
      'registro=' +
      this.state.registro +
      '&' +
      'nascimento=' +
      this.state.nascimento +
      '&' +
      'sexo=' +
      this.state.sexo +
      '&' +
      'telefone=' +
      this.state.telefone +
      '&' +
      'telefone2=' +
      this.state.telefone2 +
      '&' +
      'celular=' +
      this.state.celular +
      '&' +
      'celular1=' +
      this.state.celular1 +
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
      'responsavelFamiliar=' +
      this.state.responsavelFamiliar +
      '&' +
      'emailFamiliar=' +
      this.state.emailFamiliar +
      '&' +
      'cpfFamiliar=' +
      this.state.cpfFamiliar +
      '&' +
      'rgFamiliar=' +
      this.state.rgFamiliar +
      '&' +
      'nascimentoFamiliar=' +
      this.state.nascimentoFamiliar +
      '&' +
      'sexoFamiliar=' +
      this.state.sexoFamiliar +
      '&' +
      'telefoneFamiliar=' +
      this.state.telefoneFamiliar +
      '&' +
      'telefone2Familiar=' +
      this.state.telefone2Familiar +
      '&' +
      'celularFamiliar=' +
      this.state.celularFamiliar +
      '&' +
      'celular2Familiar=' +
      this.state.celular2Familiar +
      '&' +
      'cepFamiliar=' +
      this.state.cepFamiliar +
      '&' +
      'enderecoFamiliar=' +
      this.state.enderecoFamiliar +
      '&' +
      'numeroFamiliar=' +
      this.state.numeroFamiliar +
      '&' +
      'complementoFamiliar=' +
      this.state.complementoFamiliar +
      '&' +
      'bairroFamiliar=' +
      this.state.bairroFamiliar +
      '&' +
      'ufFamiliar=' +
      this.state.ufFamiliar +
      '&' +
      'latitudeFamiliar=' +
      this.state.latitudeFamiliar +
      '&' +
      'longitudeFamiliar=' +
      this.state.longitudeFamiliar +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      'aph=' +
      this.state.aph +
      '&' +
      'nivelComplexidade=' +
      this.state.nivelComplexidade +
      '&' +
      'passagemPs=' +
      this.state.passagemPs +
      '&' +
      'obsPs=' +
      this.state.obsPs +
      '&' +
      'passagemInternacao=' +
      this.state.passagemInternacao +
      '&' +
      'obsInternacao=' +
      this.state.obsInternacao +
      '&' +
      'custoTotal=' +
      this.state.custoTotal +
      '&' +
      'observacaoFamiliar=' +
      this.state.observacaoFamiliar +
      '&' +
      'mesmoEndereco=' +
      this.state.mesmoEndereco +
      '&' +
      'acessoFamiliar=' +
      this.state.acessoFamiliar +
      '&' +
      'comResponsavel=' +
      this.state.comResponsavel +
      '&' +
      'cadastroCompleto=' +
      this.state.cadastroCompleto +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'detalhes=' +
      this.state.detalhes +
      '&' +
      'liminar=' +
      this.state.liminar +
      '&' +
      'expoToken=' +
      this.state.expoToken +
      '&' +
      'senhaChat=' +
      this.state.senhaChat +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      'atendimentoAssinaturas=' +
      this.state.atendimentoAssinaturas +
      '&' +
      'diario=' +
      this.state.diario +
      '&' +
      'pacienteDadosCartao=' +
      this.state.pacienteDadosCartao +
      '&' +
      'pacienteDiagnostico=' +
      this.state.pacienteDiagnostico +
      '&' +
      'pacienteDiario=' +
      this.state.pacienteDiario +
      '&' +
      'pacienteEnqueteApp=' +
      this.state.pacienteEnqueteApp +
      '&' +
      'pacienteOperadora=' +
      this.state.pacienteOperadora +
      '&' +
      'pacientePedido=' +
      this.state.pacientePedido +
      '&' +
      'pacientePush=' +
      this.state.pacientePush +
      '&' +
      'pad=' +
      this.state.pad +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      'franquia=' +
      this.state.franquia +
      '&' +
      'cidade=' +
      this.state.cidade +
      '&' +
      'cidadeFamiliar=' +
      this.state.cidadeFamiliar +
      '&' +
      'grauParentesco=' +
      this.state.grauParentesco +
      '&' +
      'profissionalPref=' +
      this.state.profissionalPref +
      '&' +
      'tipohospital=' +
      this.state.tipohospital +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      senha,
      nome,
      email,
      cpf,
      rg,
      registro,
      nascimento,
      sexo,
      telefone,
      telefone2,
      celular,
      celular1,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      uf,
      latitude,
      longitude,
      responsavelFamiliar,
      emailFamiliar,
      cpfFamiliar,
      rgFamiliar,
      nascimentoFamiliar,
      sexoFamiliar,
      telefoneFamiliar,
      telefone2Familiar,
      celularFamiliar,
      celular2Familiar,
      cepFamiliar,
      enderecoFamiliar,
      numeroFamiliar,
      complementoFamiliar,
      bairroFamiliar,
      ufFamiliar,
      latitudeFamiliar,
      longitudeFamiliar,
      observacao,
      aph,
      nivelComplexidade,
      passagemPs,
      obsPs,
      passagemInternacao,
      obsInternacao,
      custoTotal,
      observacaoFamiliar,
      mesmoEndereco,
      acessoFamiliar,
      comResponsavel,
      cadastroCompleto,
      ativo,
      detalhes,
      liminar,
      expoToken,
      senhaChat,
      atendimento,
      atendimentoAssinaturas,
      diario,
      pacienteDadosCartao,
      pacienteDiagnostico,
      pacienteDiario,
      pacienteEnqueteApp,
      pacienteOperadora,
      pacientePedido,
      pacientePush,
      pad,
      unidade,
      franquia,
      cidade,
      cidadeFamiliar,
      grauParentesco,
      profissionalPref,
      tipohospital,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      senha,
      nome,
      email,
      cpf,
      rg,
      registro,
      nascimento,
      sexo,
      telefone,
      telefone2,
      celular,
      celular1,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      uf,
      latitude,
      longitude,
      responsavelFamiliar,
      emailFamiliar,
      cpfFamiliar,
      rgFamiliar,
      nascimentoFamiliar,
      sexoFamiliar,
      telefoneFamiliar,
      telefone2Familiar,
      celularFamiliar,
      celular2Familiar,
      cepFamiliar,
      enderecoFamiliar,
      numeroFamiliar,
      complementoFamiliar,
      bairroFamiliar,
      ufFamiliar,
      latitudeFamiliar,
      longitudeFamiliar,
      observacao,
      aph,
      nivelComplexidade,
      passagemPs,
      obsPs,
      passagemInternacao,
      obsInternacao,
      custoTotal,
      observacaoFamiliar,
      mesmoEndereco,
      acessoFamiliar,
      comResponsavel,
      cadastroCompleto,
      ativo,
      detalhes,
      liminar,
      expoToken,
      senhaChat,
      atendimento,
      atendimentoAssinaturas,
      diario,
      pacienteDadosCartao,
      pacienteDiagnostico,
      pacienteDiario,
      pacienteEnqueteApp,
      pacienteOperadora,
      pacientePedido,
      pacientePush,
      pad,
      unidade,
      franquia,
      cidade,
      cidadeFamiliar,
      grauParentesco,
      profissionalPref,
      tipohospital,
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

const mapStateToProps = ({ paciente, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  franquias: storeState.franquia.entities,
  cidades: storeState.cidade.entities,
  grauParentescos: storeState.grauParentesco.entities,
  profissionals: storeState.profissional.entities,
  pacienteHospitals: storeState.pacienteHospital.entities,
  pacienteList: paciente.entities,
  totalItems: paciente.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getFranquias,
  getCidades,
  getGrauParentescos,
  getProfissionals,
  getPacienteHospitals,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Paciente);
