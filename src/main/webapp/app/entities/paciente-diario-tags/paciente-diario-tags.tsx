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
import { getPacienteDiarioTagsState, IPacienteDiarioTagsBaseState, getEntities } from './paciente-diario-tags.reducer';
import { IPacienteDiarioTags } from 'app/shared/model/paciente-diario-tags.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteDiarioTagsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteDiarioTagsState extends IPacienteDiarioTagsBaseState, IPaginationBaseState {}

export class PacienteDiarioTags extends React.Component<IPacienteDiarioTagsProps, IPacienteDiarioTagsState> {
  private myFormRef: any;

  constructor(props: IPacienteDiarioTagsProps) {
    super(props);
    this.state = {
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
        <h2 id="page-heading">
          <span className="page-header">Paciente Diario Tags</span>
          <Button id="togglerFilterPacienteDiarioTags" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.pacienteDiarioTags.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.pacienteDiarioTags.home.createLabel">Create a new Paciente Diario Tags</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diario Tags</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteDiarioTags">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idPacienteDiario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPacienteDiarioLabel" for="paciente-diario-tags-idPacienteDiario">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.idPacienteDiario">Id Paciente Diario</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idPacienteDiario"
                              id="paciente-diario-tags-idPacienteDiario"
                              value={this.state.idPacienteDiario}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idDiarioTags' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idDiarioTagsLabel" for="paciente-diario-tags-idDiarioTags">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.idDiarioTags">Id Diario Tags</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idDiarioTags"
                              id="paciente-diario-tags-idDiarioTags"
                              value={this.state.idDiarioTags}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'escalaDePlantao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'captacaoEdp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="captacaoEdpLabel" for="paciente-diario-tags-captacaoEdp">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoEdp">Captacao Edp</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="captacaoEdp"
                              id="paciente-diario-tags-captacaoEdp"
                              value={this.state.captacaoEdp}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'implantacaoEdp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'furoDeEscalaEdp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'solicitacaoDeFolgaEdp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'trocaDeProfissionalEdp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'reclamacaoEdp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'elogioEdp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="elogioEdpLabel" for="paciente-diario-tags-elogioEdp">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.elogioEdp">Elogio Edp</Translate>
                            </Label>
                            <AvInput type="string" name="elogioEdp" id="paciente-diario-tags-elogioEdp" value={this.state.elogioEdp} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'recusaDeAtendimentoEdp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'duplicidadeEdp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'monitorarEdp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'pendenteEdp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pendenteEdpLabel" for="paciente-diario-tags-pendenteEdp">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEdp">Pendente Edp</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="pendenteEdp"
                              id="paciente-diario-tags-pendenteEdp"
                              value={this.state.pendenteEdp}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'escalaMultiProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'captacaoEmp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="captacaoEmpLabel" for="paciente-diario-tags-captacaoEmp">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoEmp">Captacao Emp</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="captacaoEmp"
                              id="paciente-diario-tags-captacaoEmp"
                              value={this.state.captacaoEmp}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'implantacaoEmp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'solicitacaoDeFolgaEmp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'trocaDeProfissionalEmp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'reclamacaoEmp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'elogioEmp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="elogioEmpLabel" for="paciente-diario-tags-elogioEmp">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.elogioEmp">Elogio Emp</Translate>
                            </Label>
                            <AvInput type="string" name="elogioEmp" id="paciente-diario-tags-elogioEmp" value={this.state.elogioEmp} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'padIncompletoEmp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'visitaImprodutivaEmp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="visitaImprodutivaEmpLabel" for="paciente-diario-tags-visitaImprodutivaEmp">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.visitaImprodutivaEmp">
                                Visita Improdutiva Emp
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="visitaImprodutivaEmp"
                              id="paciente-diario-tags-visitaImprodutivaEmp"
                              value={this.state.visitaImprodutivaEmp}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'monitorarEmp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'pendenteEmp' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pendenteEmpLabel" for="paciente-diario-tags-pendenteEmp">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEmp">Pendente Emp</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="pendenteEmp"
                              id="paciente-diario-tags-pendenteEmp"
                              value={this.state.pendenteEmp}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'intercorrencia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'clinicaInter' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'aphInter' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="aphInterLabel" for="paciente-diario-tags-aphInter">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.aphInter">Aph Inter</Translate>
                            </Label>
                            <AvInput type="string" name="aphInter" id="paciente-diario-tags-aphInter" value={this.state.aphInter} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'pendenteInter' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pendenteInterLabel" for="paciente-diario-tags-pendenteInter">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteInter">Pendente Inter</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="pendenteInter"
                              id="paciente-diario-tags-pendenteInter"
                              value={this.state.pendenteInter}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'solicitacoes' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'recargaDeOxigenioSolic' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'equipamentosSolic' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'matmedSolic' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="matmedSolicLabel" for="paciente-diario-tags-matmedSolic">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.matmedSolic">Matmed Solic</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="matmedSolic"
                              id="paciente-diario-tags-matmedSolic"
                              value={this.state.matmedSolic}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'prontuarioSolic' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'prescricoesSolic' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'examesSolic' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="examesSolicLabel" for="paciente-diario-tags-examesSolic">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.examesSolic">Exames Solic</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="examesSolic"
                              id="paciente-diario-tags-examesSolic"
                              value={this.state.examesSolic}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ambulanciaSolic' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'atendimentoDeEquipeSolic' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'monitorarSolic' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'pendenteSolic' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pendenteSolicLabel" for="paciente-diario-tags-pendenteSolic">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteSolic">Pendente Solic</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="pendenteSolic"
                              id="paciente-diario-tags-pendenteSolic"
                              value={this.state.pendenteSolic}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'avaliacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="avaliacaoLabel" for="paciente-diario-tags-avaliacao">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.avaliacao">Avaliacao</Translate>
                            </Label>
                            <AvInput type="string" name="avaliacao" id="paciente-diario-tags-avaliacao" value={this.state.avaliacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'residenciaAval' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'hospitalAval' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'monitorarAval' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'captacaoAtivaAval' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'pendenteAval' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pendenteAvalLabel" for="paciente-diario-tags-pendenteAval">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteAval">Pendente Aval</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="pendenteAval"
                              id="paciente-diario-tags-pendenteAval"
                              value={this.state.pendenteAval}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'implantacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="implantacaoLabel" for="paciente-diario-tags-implantacao">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.implantacao">Implantacao</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="implantacao"
                              id="paciente-diario-tags-implantacao"
                              value={this.state.implantacao}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'monitorarImpl' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'pendenteImpl' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pendenteImplLabel" for="paciente-diario-tags-pendenteImpl">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteImpl">Pendente Impl</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="pendenteImpl"
                              id="paciente-diario-tags-pendenteImpl"
                              value={this.state.pendenteImpl}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'alta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="altaLabel" for="paciente-diario-tags-alta">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.alta">Alta</Translate>
                            </Label>
                            <AvInput type="string" name="alta" id="paciente-diario-tags-alta" value={this.state.alta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'hospitalizacaoAlt' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'migracaoDeEmpresaAlt' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="migracaoDeEmpresaAltLabel" for="paciente-diario-tags-migracaoDeEmpresaAlt">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.migracaoDeEmpresaAlt">
                                Migracao De Empresa Alt
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="migracaoDeEmpresaAlt"
                              id="paciente-diario-tags-migracaoDeEmpresaAlt"
                              value={this.state.migracaoDeEmpresaAlt}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'obitoEmCasaAlt' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'terminoDeAtendimentoAlt' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'atendimentoSuspensoAlt' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'monitorarAlt' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'pendenteAlt' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pendenteAltLabel" for="paciente-diario-tags-pendenteAlt">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteAlt">Pendente Alt</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="pendenteAlt"
                              id="paciente-diario-tags-pendenteAlt"
                              value={this.state.pendenteAlt}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'eCommerceSegViagem' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'monitorarEcsv' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'pendenteEcsv' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pendenteEcsvLabel" for="paciente-diario-tags-pendenteEcsv">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEcsv">Pendente Ecsv</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="pendenteEcsv"
                              id="paciente-diario-tags-pendenteEcsv"
                              value={this.state.pendenteEcsv}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'farmacia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="farmaciaLabel" for="paciente-diario-tags-farmacia">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.farmacia">Farmacia</Translate>
                            </Label>
                            <AvInput type="string" name="farmacia" id="paciente-diario-tags-farmacia" value={this.state.farmacia} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'matMedFarm' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="matMedFarmLabel" for="paciente-diario-tags-matMedFarm">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.matMedFarm">Mat Med Farm</Translate>
                            </Label>
                            <AvInput type="string" name="matMedFarm" id="paciente-diario-tags-matMedFarm" value={this.state.matMedFarm} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'receitaFarm' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="receitaFarmLabel" for="paciente-diario-tags-receitaFarm">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.receitaFarm">Receita Farm</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="receitaFarm"
                              id="paciente-diario-tags-receitaFarm"
                              value={this.state.receitaFarm}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'prontuarioFarm' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="prontuarioFarmLabel" for="paciente-diario-tags-prontuarioFarm">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.prontuarioFarm">Prontuario Farm</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="prontuarioFarm"
                              id="paciente-diario-tags-prontuarioFarm"
                              value={this.state.prontuarioFarm}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'romaneioManualFarm' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="romaneioManualFarmLabel" for="paciente-diario-tags-romaneioManualFarm">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.romaneioManualFarm">Romaneio Manual Farm</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="romaneioManualFarm"
                              id="paciente-diario-tags-romaneioManualFarm"
                              value={this.state.romaneioManualFarm}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'outrosFarm' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="outrosFarmLabel" for="paciente-diario-tags-outrosFarm">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.outrosFarm">Outros Farm</Translate>
                            </Label>
                            <AvInput type="string" name="outrosFarm" id="paciente-diario-tags-outrosFarm" value={this.state.outrosFarm} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'monitorarFarm' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="monitorarFarmLabel" for="paciente-diario-tags-monitorarFarm">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarFarm">Monitorar Farm</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="monitorarFarm"
                              id="paciente-diario-tags-monitorarFarm"
                              value={this.state.monitorarFarm}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'pendenteFarm' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pendenteFarmLabel" for="paciente-diario-tags-pendenteFarm">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteFarm">Pendente Farm</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="pendenteFarm"
                              id="paciente-diario-tags-pendenteFarm"
                              value={this.state.pendenteFarm}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'contatoTelefonico' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="contatoTelefonicoLabel" for="paciente-diario-tags-contatoTelefonico">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.contatoTelefonico">Contato Telefonico</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="contatoTelefonico"
                              id="paciente-diario-tags-contatoTelefonico"
                              value={this.state.contatoTelefonico}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativoContTel' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoContTelLabel" for="paciente-diario-tags-ativoContTel">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.ativoContTel">Ativo Cont Tel</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ativoContTel"
                              id="paciente-diario-tags-ativoContTel"
                              value={this.state.ativoContTel}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'receptivoContTel' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="receptivoContTelLabel" for="paciente-diario-tags-receptivoContTel">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.receptivoContTel">Receptivo Cont Tel</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="receptivoContTel"
                              id="paciente-diario-tags-receptivoContTel"
                              value={this.state.receptivoContTel}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'monitorarContTel' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="monitorarContTelLabel" for="paciente-diario-tags-monitorarContTel">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarContTel">Monitorar Cont Tel</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="monitorarContTel"
                              id="paciente-diario-tags-monitorarContTel"
                              value={this.state.monitorarContTel}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'pendenteContTel' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pendenteContTelLabel" for="paciente-diario-tags-pendenteContTel">
                              <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteContTel">Pendente Cont Tel</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="pendenteContTel"
                              id="paciente-diario-tags-pendenteContTel"
                              value={this.state.pendenteContTel}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dtPost' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.pacienteDiarioTags.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.pacienteDiarioTags.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'idPacienteDiario' ? (
                        <th className="hand" onClick={this.sort('idPacienteDiario')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.idPacienteDiario">Id Paciente Diario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idDiarioTags' ? (
                        <th className="hand" onClick={this.sort('idDiarioTags')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.idDiarioTags">Id Diario Tags</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'escalaDePlantao' ? (
                        <th className="hand" onClick={this.sort('escalaDePlantao')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.escalaDePlantao">Escala De Plantao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'captacaoEdp' ? (
                        <th className="hand" onClick={this.sort('captacaoEdp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoEdp">Captacao Edp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'implantacaoEdp' ? (
                        <th className="hand" onClick={this.sort('implantacaoEdp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.implantacaoEdp">Implantacao Edp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'furoDeEscalaEdp' ? (
                        <th className="hand" onClick={this.sort('furoDeEscalaEdp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.furoDeEscalaEdp">Furo De Escala Edp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'solicitacaoDeFolgaEdp' ? (
                        <th className="hand" onClick={this.sort('solicitacaoDeFolgaEdp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacaoDeFolgaEdp">Solicitacao De Folga Edp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'trocaDeProfissionalEdp' ? (
                        <th className="hand" onClick={this.sort('trocaDeProfissionalEdp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.trocaDeProfissionalEdp">
                            Troca De Profissional Edp
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'reclamacaoEdp' ? (
                        <th className="hand" onClick={this.sort('reclamacaoEdp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.reclamacaoEdp">Reclamacao Edp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'elogioEdp' ? (
                        <th className="hand" onClick={this.sort('elogioEdp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.elogioEdp">Elogio Edp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'recusaDeAtendimentoEdp' ? (
                        <th className="hand" onClick={this.sort('recusaDeAtendimentoEdp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.recusaDeAtendimentoEdp">
                            Recusa De Atendimento Edp
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'duplicidadeEdp' ? (
                        <th className="hand" onClick={this.sort('duplicidadeEdp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.duplicidadeEdp">Duplicidade Edp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'monitorarEdp' ? (
                        <th className="hand" onClick={this.sort('monitorarEdp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEdp">Monitorar Edp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pendenteEdp' ? (
                        <th className="hand" onClick={this.sort('pendenteEdp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEdp">Pendente Edp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'escalaMultiProfissional' ? (
                        <th className="hand" onClick={this.sort('escalaMultiProfissional')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.escalaMultiProfissional">
                            Escala Multi Profissional
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'captacaoEmp' ? (
                        <th className="hand" onClick={this.sort('captacaoEmp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoEmp">Captacao Emp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'implantacaoEmp' ? (
                        <th className="hand" onClick={this.sort('implantacaoEmp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.implantacaoEmp">Implantacao Emp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'solicitacaoDeFolgaEmp' ? (
                        <th className="hand" onClick={this.sort('solicitacaoDeFolgaEmp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacaoDeFolgaEmp">Solicitacao De Folga Emp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'trocaDeProfissionalEmp' ? (
                        <th className="hand" onClick={this.sort('trocaDeProfissionalEmp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.trocaDeProfissionalEmp">
                            Troca De Profissional Emp
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'reclamacaoEmp' ? (
                        <th className="hand" onClick={this.sort('reclamacaoEmp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.reclamacaoEmp">Reclamacao Emp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'elogioEmp' ? (
                        <th className="hand" onClick={this.sort('elogioEmp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.elogioEmp">Elogio Emp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'padIncompletoEmp' ? (
                        <th className="hand" onClick={this.sort('padIncompletoEmp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.padIncompletoEmp">Pad Incompleto Emp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'visitaImprodutivaEmp' ? (
                        <th className="hand" onClick={this.sort('visitaImprodutivaEmp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.visitaImprodutivaEmp">Visita Improdutiva Emp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'monitorarEmp' ? (
                        <th className="hand" onClick={this.sort('monitorarEmp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEmp">Monitorar Emp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pendenteEmp' ? (
                        <th className="hand" onClick={this.sort('pendenteEmp')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEmp">Pendente Emp</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'intercorrencia' ? (
                        <th className="hand" onClick={this.sort('intercorrencia')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.intercorrencia">Intercorrencia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'clinicaInter' ? (
                        <th className="hand" onClick={this.sort('clinicaInter')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.clinicaInter">Clinica Inter</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'aphInter' ? (
                        <th className="hand" onClick={this.sort('aphInter')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.aphInter">Aph Inter</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pendenteInter' ? (
                        <th className="hand" onClick={this.sort('pendenteInter')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteInter">Pendente Inter</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'solicitacoes' ? (
                        <th className="hand" onClick={this.sort('solicitacoes')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacoes">Solicitacoes</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'recargaDeOxigenioSolic' ? (
                        <th className="hand" onClick={this.sort('recargaDeOxigenioSolic')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.recargaDeOxigenioSolic">
                            Recarga De Oxigenio Solic
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'equipamentosSolic' ? (
                        <th className="hand" onClick={this.sort('equipamentosSolic')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.equipamentosSolic">Equipamentos Solic</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'matmedSolic' ? (
                        <th className="hand" onClick={this.sort('matmedSolic')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.matmedSolic">Matmed Solic</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'prontuarioSolic' ? (
                        <th className="hand" onClick={this.sort('prontuarioSolic')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.prontuarioSolic">Prontuario Solic</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'prescricoesSolic' ? (
                        <th className="hand" onClick={this.sort('prescricoesSolic')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.prescricoesSolic">Prescricoes Solic</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'examesSolic' ? (
                        <th className="hand" onClick={this.sort('examesSolic')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.examesSolic">Exames Solic</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ambulanciaSolic' ? (
                        <th className="hand" onClick={this.sort('ambulanciaSolic')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.ambulanciaSolic">Ambulancia Solic</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'atendimentoDeEquipeSolic' ? (
                        <th className="hand" onClick={this.sort('atendimentoDeEquipeSolic')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.atendimentoDeEquipeSolic">
                            Atendimento De Equipe Solic
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'monitorarSolic' ? (
                        <th className="hand" onClick={this.sort('monitorarSolic')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarSolic">Monitorar Solic</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pendenteSolic' ? (
                        <th className="hand" onClick={this.sort('pendenteSolic')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteSolic">Pendente Solic</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'avaliacao' ? (
                        <th className="hand" onClick={this.sort('avaliacao')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.avaliacao">Avaliacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'residenciaAval' ? (
                        <th className="hand" onClick={this.sort('residenciaAval')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.residenciaAval">Residencia Aval</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'hospitalAval' ? (
                        <th className="hand" onClick={this.sort('hospitalAval')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.hospitalAval">Hospital Aval</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'monitorarAval' ? (
                        <th className="hand" onClick={this.sort('monitorarAval')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarAval">Monitorar Aval</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'captacaoAtivaAval' ? (
                        <th className="hand" onClick={this.sort('captacaoAtivaAval')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoAtivaAval">Captacao Ativa Aval</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pendenteAval' ? (
                        <th className="hand" onClick={this.sort('pendenteAval')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteAval">Pendente Aval</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'implantacao' ? (
                        <th className="hand" onClick={this.sort('implantacao')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.implantacao">Implantacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'monitorarImpl' ? (
                        <th className="hand" onClick={this.sort('monitorarImpl')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarImpl">Monitorar Impl</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pendenteImpl' ? (
                        <th className="hand" onClick={this.sort('pendenteImpl')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteImpl">Pendente Impl</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'alta' ? (
                        <th className="hand" onClick={this.sort('alta')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.alta">Alta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'hospitalizacaoAlt' ? (
                        <th className="hand" onClick={this.sort('hospitalizacaoAlt')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.hospitalizacaoAlt">Hospitalizacao Alt</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'migracaoDeEmpresaAlt' ? (
                        <th className="hand" onClick={this.sort('migracaoDeEmpresaAlt')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.migracaoDeEmpresaAlt">Migracao De Empresa Alt</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'obitoEmCasaAlt' ? (
                        <th className="hand" onClick={this.sort('obitoEmCasaAlt')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.obitoEmCasaAlt">Obito Em Casa Alt</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'terminoDeAtendimentoAlt' ? (
                        <th className="hand" onClick={this.sort('terminoDeAtendimentoAlt')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.terminoDeAtendimentoAlt">
                            Termino De Atendimento Alt
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'atendimentoSuspensoAlt' ? (
                        <th className="hand" onClick={this.sort('atendimentoSuspensoAlt')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.atendimentoSuspensoAlt">
                            Atendimento Suspenso Alt
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'monitorarAlt' ? (
                        <th className="hand" onClick={this.sort('monitorarAlt')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarAlt">Monitorar Alt</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pendenteAlt' ? (
                        <th className="hand" onClick={this.sort('pendenteAlt')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteAlt">Pendente Alt</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'eCommerceSegViagem' ? (
                        <th className="hand" onClick={this.sort('eCommerceSegViagem')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.eCommerceSegViagem">E Commerce Seg Viagem</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'monitorarEcsv' ? (
                        <th className="hand" onClick={this.sort('monitorarEcsv')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEcsv">Monitorar Ecsv</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pendenteEcsv' ? (
                        <th className="hand" onClick={this.sort('pendenteEcsv')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEcsv">Pendente Ecsv</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'farmacia' ? (
                        <th className="hand" onClick={this.sort('farmacia')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.farmacia">Farmacia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'matMedFarm' ? (
                        <th className="hand" onClick={this.sort('matMedFarm')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.matMedFarm">Mat Med Farm</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'receitaFarm' ? (
                        <th className="hand" onClick={this.sort('receitaFarm')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.receitaFarm">Receita Farm</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'prontuarioFarm' ? (
                        <th className="hand" onClick={this.sort('prontuarioFarm')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.prontuarioFarm">Prontuario Farm</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'romaneioManualFarm' ? (
                        <th className="hand" onClick={this.sort('romaneioManualFarm')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.romaneioManualFarm">Romaneio Manual Farm</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'outrosFarm' ? (
                        <th className="hand" onClick={this.sort('outrosFarm')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.outrosFarm">Outros Farm</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'monitorarFarm' ? (
                        <th className="hand" onClick={this.sort('monitorarFarm')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarFarm">Monitorar Farm</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pendenteFarm' ? (
                        <th className="hand" onClick={this.sort('pendenteFarm')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteFarm">Pendente Farm</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'contatoTelefonico' ? (
                        <th className="hand" onClick={this.sort('contatoTelefonico')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.contatoTelefonico">Contato Telefonico</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativoContTel' ? (
                        <th className="hand" onClick={this.sort('ativoContTel')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.ativoContTel">Ativo Cont Tel</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'receptivoContTel' ? (
                        <th className="hand" onClick={this.sort('receptivoContTel')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.receptivoContTel">Receptivo Cont Tel</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'monitorarContTel' ? (
                        <th className="hand" onClick={this.sort('monitorarContTel')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarContTel">Monitorar Cont Tel</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pendenteContTel' ? (
                        <th className="hand" onClick={this.sort('pendenteContTel')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteContTel">Pendente Cont Tel</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dtPost' ? (
                        <th className="hand" onClick={this.sort('dtPost')}>
                          <Translate contentKey="generadorApp.pacienteDiarioTags.dtPost">Dt Post</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'idPacienteDiario' ? <td>{pacienteDiarioTags.idPacienteDiario}</td> : null}

                        {this.state.baseFilters !== 'idDiarioTags' ? <td>{pacienteDiarioTags.idDiarioTags}</td> : null}

                        {this.state.baseFilters !== 'escalaDePlantao' ? <td>{pacienteDiarioTags.escalaDePlantao}</td> : null}

                        {this.state.baseFilters !== 'captacaoEdp' ? <td>{pacienteDiarioTags.captacaoEdp}</td> : null}

                        {this.state.baseFilters !== 'implantacaoEdp' ? <td>{pacienteDiarioTags.implantacaoEdp}</td> : null}

                        {this.state.baseFilters !== 'furoDeEscalaEdp' ? <td>{pacienteDiarioTags.furoDeEscalaEdp}</td> : null}

                        {this.state.baseFilters !== 'solicitacaoDeFolgaEdp' ? <td>{pacienteDiarioTags.solicitacaoDeFolgaEdp}</td> : null}

                        {this.state.baseFilters !== 'trocaDeProfissionalEdp' ? <td>{pacienteDiarioTags.trocaDeProfissionalEdp}</td> : null}

                        {this.state.baseFilters !== 'reclamacaoEdp' ? <td>{pacienteDiarioTags.reclamacaoEdp}</td> : null}

                        {this.state.baseFilters !== 'elogioEdp' ? <td>{pacienteDiarioTags.elogioEdp}</td> : null}

                        {this.state.baseFilters !== 'recusaDeAtendimentoEdp' ? <td>{pacienteDiarioTags.recusaDeAtendimentoEdp}</td> : null}

                        {this.state.baseFilters !== 'duplicidadeEdp' ? <td>{pacienteDiarioTags.duplicidadeEdp}</td> : null}

                        {this.state.baseFilters !== 'monitorarEdp' ? <td>{pacienteDiarioTags.monitorarEdp}</td> : null}

                        {this.state.baseFilters !== 'pendenteEdp' ? <td>{pacienteDiarioTags.pendenteEdp}</td> : null}

                        {this.state.baseFilters !== 'escalaMultiProfissional' ? (
                          <td>{pacienteDiarioTags.escalaMultiProfissional}</td>
                        ) : null}

                        {this.state.baseFilters !== 'captacaoEmp' ? <td>{pacienteDiarioTags.captacaoEmp}</td> : null}

                        {this.state.baseFilters !== 'implantacaoEmp' ? <td>{pacienteDiarioTags.implantacaoEmp}</td> : null}

                        {this.state.baseFilters !== 'solicitacaoDeFolgaEmp' ? <td>{pacienteDiarioTags.solicitacaoDeFolgaEmp}</td> : null}

                        {this.state.baseFilters !== 'trocaDeProfissionalEmp' ? <td>{pacienteDiarioTags.trocaDeProfissionalEmp}</td> : null}

                        {this.state.baseFilters !== 'reclamacaoEmp' ? <td>{pacienteDiarioTags.reclamacaoEmp}</td> : null}

                        {this.state.baseFilters !== 'elogioEmp' ? <td>{pacienteDiarioTags.elogioEmp}</td> : null}

                        {this.state.baseFilters !== 'padIncompletoEmp' ? <td>{pacienteDiarioTags.padIncompletoEmp}</td> : null}

                        {this.state.baseFilters !== 'visitaImprodutivaEmp' ? <td>{pacienteDiarioTags.visitaImprodutivaEmp}</td> : null}

                        {this.state.baseFilters !== 'monitorarEmp' ? <td>{pacienteDiarioTags.monitorarEmp}</td> : null}

                        {this.state.baseFilters !== 'pendenteEmp' ? <td>{pacienteDiarioTags.pendenteEmp}</td> : null}

                        {this.state.baseFilters !== 'intercorrencia' ? <td>{pacienteDiarioTags.intercorrencia}</td> : null}

                        {this.state.baseFilters !== 'clinicaInter' ? <td>{pacienteDiarioTags.clinicaInter}</td> : null}

                        {this.state.baseFilters !== 'aphInter' ? <td>{pacienteDiarioTags.aphInter}</td> : null}

                        {this.state.baseFilters !== 'pendenteInter' ? <td>{pacienteDiarioTags.pendenteInter}</td> : null}

                        {this.state.baseFilters !== 'solicitacoes' ? <td>{pacienteDiarioTags.solicitacoes}</td> : null}

                        {this.state.baseFilters !== 'recargaDeOxigenioSolic' ? <td>{pacienteDiarioTags.recargaDeOxigenioSolic}</td> : null}

                        {this.state.baseFilters !== 'equipamentosSolic' ? <td>{pacienteDiarioTags.equipamentosSolic}</td> : null}

                        {this.state.baseFilters !== 'matmedSolic' ? <td>{pacienteDiarioTags.matmedSolic}</td> : null}

                        {this.state.baseFilters !== 'prontuarioSolic' ? <td>{pacienteDiarioTags.prontuarioSolic}</td> : null}

                        {this.state.baseFilters !== 'prescricoesSolic' ? <td>{pacienteDiarioTags.prescricoesSolic}</td> : null}

                        {this.state.baseFilters !== 'examesSolic' ? <td>{pacienteDiarioTags.examesSolic}</td> : null}

                        {this.state.baseFilters !== 'ambulanciaSolic' ? <td>{pacienteDiarioTags.ambulanciaSolic}</td> : null}

                        {this.state.baseFilters !== 'atendimentoDeEquipeSolic' ? (
                          <td>{pacienteDiarioTags.atendimentoDeEquipeSolic}</td>
                        ) : null}

                        {this.state.baseFilters !== 'monitorarSolic' ? <td>{pacienteDiarioTags.monitorarSolic}</td> : null}

                        {this.state.baseFilters !== 'pendenteSolic' ? <td>{pacienteDiarioTags.pendenteSolic}</td> : null}

                        {this.state.baseFilters !== 'avaliacao' ? <td>{pacienteDiarioTags.avaliacao}</td> : null}

                        {this.state.baseFilters !== 'residenciaAval' ? <td>{pacienteDiarioTags.residenciaAval}</td> : null}

                        {this.state.baseFilters !== 'hospitalAval' ? <td>{pacienteDiarioTags.hospitalAval}</td> : null}

                        {this.state.baseFilters !== 'monitorarAval' ? <td>{pacienteDiarioTags.monitorarAval}</td> : null}

                        {this.state.baseFilters !== 'captacaoAtivaAval' ? <td>{pacienteDiarioTags.captacaoAtivaAval}</td> : null}

                        {this.state.baseFilters !== 'pendenteAval' ? <td>{pacienteDiarioTags.pendenteAval}</td> : null}

                        {this.state.baseFilters !== 'implantacao' ? <td>{pacienteDiarioTags.implantacao}</td> : null}

                        {this.state.baseFilters !== 'monitorarImpl' ? <td>{pacienteDiarioTags.monitorarImpl}</td> : null}

                        {this.state.baseFilters !== 'pendenteImpl' ? <td>{pacienteDiarioTags.pendenteImpl}</td> : null}

                        {this.state.baseFilters !== 'alta' ? <td>{pacienteDiarioTags.alta}</td> : null}

                        {this.state.baseFilters !== 'hospitalizacaoAlt' ? <td>{pacienteDiarioTags.hospitalizacaoAlt}</td> : null}

                        {this.state.baseFilters !== 'migracaoDeEmpresaAlt' ? <td>{pacienteDiarioTags.migracaoDeEmpresaAlt}</td> : null}

                        {this.state.baseFilters !== 'obitoEmCasaAlt' ? <td>{pacienteDiarioTags.obitoEmCasaAlt}</td> : null}

                        {this.state.baseFilters !== 'terminoDeAtendimentoAlt' ? (
                          <td>{pacienteDiarioTags.terminoDeAtendimentoAlt}</td>
                        ) : null}

                        {this.state.baseFilters !== 'atendimentoSuspensoAlt' ? <td>{pacienteDiarioTags.atendimentoSuspensoAlt}</td> : null}

                        {this.state.baseFilters !== 'monitorarAlt' ? <td>{pacienteDiarioTags.monitorarAlt}</td> : null}

                        {this.state.baseFilters !== 'pendenteAlt' ? <td>{pacienteDiarioTags.pendenteAlt}</td> : null}

                        {this.state.baseFilters !== 'eCommerceSegViagem' ? <td>{pacienteDiarioTags.eCommerceSegViagem}</td> : null}

                        {this.state.baseFilters !== 'monitorarEcsv' ? <td>{pacienteDiarioTags.monitorarEcsv}</td> : null}

                        {this.state.baseFilters !== 'pendenteEcsv' ? <td>{pacienteDiarioTags.pendenteEcsv}</td> : null}

                        {this.state.baseFilters !== 'farmacia' ? <td>{pacienteDiarioTags.farmacia}</td> : null}

                        {this.state.baseFilters !== 'matMedFarm' ? <td>{pacienteDiarioTags.matMedFarm}</td> : null}

                        {this.state.baseFilters !== 'receitaFarm' ? <td>{pacienteDiarioTags.receitaFarm}</td> : null}

                        {this.state.baseFilters !== 'prontuarioFarm' ? <td>{pacienteDiarioTags.prontuarioFarm}</td> : null}

                        {this.state.baseFilters !== 'romaneioManualFarm' ? <td>{pacienteDiarioTags.romaneioManualFarm}</td> : null}

                        {this.state.baseFilters !== 'outrosFarm' ? <td>{pacienteDiarioTags.outrosFarm}</td> : null}

                        {this.state.baseFilters !== 'monitorarFarm' ? <td>{pacienteDiarioTags.monitorarFarm}</td> : null}

                        {this.state.baseFilters !== 'pendenteFarm' ? <td>{pacienteDiarioTags.pendenteFarm}</td> : null}

                        {this.state.baseFilters !== 'contatoTelefonico' ? <td>{pacienteDiarioTags.contatoTelefonico}</td> : null}

                        {this.state.baseFilters !== 'ativoContTel' ? <td>{pacienteDiarioTags.ativoContTel}</td> : null}

                        {this.state.baseFilters !== 'receptivoContTel' ? <td>{pacienteDiarioTags.receptivoContTel}</td> : null}

                        {this.state.baseFilters !== 'monitorarContTel' ? <td>{pacienteDiarioTags.monitorarContTel}</td> : null}

                        {this.state.baseFilters !== 'pendenteContTel' ? <td>{pacienteDiarioTags.pendenteContTel}</td> : null}

                        {this.state.baseFilters !== 'dtPost' ? (
                          <td>
                            <TextFormat type="date" value={pacienteDiarioTags.dtPost} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacienteDiarioTags.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${pacienteDiarioTags.id}/edit?${this.getFiltersURL()}`}
                              color="primary"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${pacienteDiarioTags.id}/delete?${this.getFiltersURL()}`}
                              color="danger"
                              size="sm"
                            >
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
