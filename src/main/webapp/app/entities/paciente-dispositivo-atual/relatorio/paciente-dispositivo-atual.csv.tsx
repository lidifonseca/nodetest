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
import { Translate, translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import {
  getPacienteDispositivoAtualState,
  IPacienteDispositivoAtualBaseState,
  getEntitiesExport
} from '../paciente-dispositivo-atual.reducer';
import { IPacienteDispositivoAtual } from 'app/shared/model/paciente-dispositivo-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteDispositivoAtualProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteDispositivoAtualState extends IPacienteDispositivoAtualBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class PacienteDispositivoAtual extends React.Component<IPacienteDispositivoAtualProps, IPacienteDispositivoAtualState> {
  private myFormRef: any;

  constructor(props: IPacienteDispositivoAtualProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacienteDispositivoAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPaciente: '',
        idPacienteDispositivo: '',
        tqtTraqueostomia: '',
        gttGastrostomia: '',
        sneSondaNasoenteral: '',
        svdSondaVesicalDeDemora: '',
        svaSondaVesicalDeAlivio: '',
        portACath: '',
        piccAcessoVenosoCentral: '',
        ventiladores: '',
        uppUlceraPorPressao: '',
        avpAcessoVenosoPeriferico: '',
        uripen: '',
        fraldaGeriatrica: '',
        sngSondaNasogastrica: '',
        bipap: '',
        cpap: '',
        cistostomia: '',
        cateterNasalDeOxigenio: '',
        mascaraDeVentilacao: '',
        entubacaoOrotraqueal: '',
        ileostomia: '',
        jejunostomia: '',
        colostomia: ''
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
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idPacienteDispositivo=' +
      this.state.idPacienteDispositivo +
      '&' +
      'tqtTraqueostomia=' +
      this.state.tqtTraqueostomia +
      '&' +
      'gttGastrostomia=' +
      this.state.gttGastrostomia +
      '&' +
      'sneSondaNasoenteral=' +
      this.state.sneSondaNasoenteral +
      '&' +
      'svdSondaVesicalDeDemora=' +
      this.state.svdSondaVesicalDeDemora +
      '&' +
      'svaSondaVesicalDeAlivio=' +
      this.state.svaSondaVesicalDeAlivio +
      '&' +
      'portACath=' +
      this.state.portACath +
      '&' +
      'piccAcessoVenosoCentral=' +
      this.state.piccAcessoVenosoCentral +
      '&' +
      'ventiladores=' +
      this.state.ventiladores +
      '&' +
      'uppUlceraPorPressao=' +
      this.state.uppUlceraPorPressao +
      '&' +
      'avpAcessoVenosoPeriferico=' +
      this.state.avpAcessoVenosoPeriferico +
      '&' +
      'uripen=' +
      this.state.uripen +
      '&' +
      'fraldaGeriatrica=' +
      this.state.fraldaGeriatrica +
      '&' +
      'sngSondaNasogastrica=' +
      this.state.sngSondaNasogastrica +
      '&' +
      'bipap=' +
      this.state.bipap +
      '&' +
      'cpap=' +
      this.state.cpap +
      '&' +
      'cistostomia=' +
      this.state.cistostomia +
      '&' +
      'cateterNasalDeOxigenio=' +
      this.state.cateterNasalDeOxigenio +
      '&' +
      'mascaraDeVentilacao=' +
      this.state.mascaraDeVentilacao +
      '&' +
      'entubacaoOrotraqueal=' +
      this.state.entubacaoOrotraqueal +
      '&' +
      'ileostomia=' +
      this.state.ileostomia +
      '&' +
      'jejunostomia=' +
      this.state.jejunostomia +
      '&' +
      'colostomia=' +
      this.state.colostomia +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idPaciente,
      idPacienteDispositivo,
      tqtTraqueostomia,
      gttGastrostomia,
      sneSondaNasoenteral,
      svdSondaVesicalDeDemora,
      svaSondaVesicalDeAlivio,
      portACath,
      piccAcessoVenosoCentral,
      ventiladores,
      uppUlceraPorPressao,
      avpAcessoVenosoPeriferico,
      uripen,
      fraldaGeriatrica,
      sngSondaNasogastrica,
      bipap,
      cpap,
      cistostomia,
      cateterNasalDeOxigenio,
      mascaraDeVentilacao,
      entubacaoOrotraqueal,
      ileostomia,
      jejunostomia,
      colostomia,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      idPaciente,
      idPacienteDispositivo,
      tqtTraqueostomia,
      gttGastrostomia,
      sneSondaNasoenteral,
      svdSondaVesicalDeDemora,
      svaSondaVesicalDeAlivio,
      portACath,
      piccAcessoVenosoCentral,
      ventiladores,
      uppUlceraPorPressao,
      avpAcessoVenosoPeriferico,
      uripen,
      fraldaGeriatrica,
      sngSondaNasogastrica,
      bipap,
      cpap,
      cistostomia,
      cateterNasalDeOxigenio,
      mascaraDeVentilacao,
      entubacaoOrotraqueal,
      ileostomia,
      jejunostomia,
      colostomia,
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

const mapStateToProps = ({ pacienteDispositivoAtual, ...storeState }: IRootState) => ({
  pacienteDispositivoAtualList: pacienteDispositivoAtual.entities,
  totalItems: pacienteDispositivoAtual.totalItems
});

const mapDispatchToProps = {
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDispositivoAtual);
