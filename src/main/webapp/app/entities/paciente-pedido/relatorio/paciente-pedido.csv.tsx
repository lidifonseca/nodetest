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
import { getPacientePedidoState, IPacientePedidoBaseState, getEntitiesExport } from '../paciente-pedido.reducer';
import { IPacientePedido } from 'app/shared/model/paciente-pedido.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IPacienteDadosCartao } from 'app/shared/model/paciente-dados-cartao.model';
import { getEntities as getPacienteDadosCartaos } from 'app/entities/paciente-dados-cartao/paciente-dados-cartao.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';

export interface IPacientePedidoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacientePedidoState extends IPacientePedidoBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class PacientePedido extends React.Component<IPacientePedidoProps, IPacientePedidoState> {
  private myFormRef: any;

  constructor(props: IPacientePedidoProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacientePedidoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getPacientes();
    this.props.getPacienteDadosCartaos();
    this.props.getEspecialidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        dataPedido: '',
        dataAgenda: '',
        qtdSessoes: '',
        parcelas: '',
        valor: '',
        desconto: '',
        tipoValor: '',
        unidade: '',
        paciente: '',
        cartao: '',
        especialidade: ''
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
      'dataPedido=' +
      this.state.dataPedido +
      '&' +
      'dataAgenda=' +
      this.state.dataAgenda +
      '&' +
      'qtdSessoes=' +
      this.state.qtdSessoes +
      '&' +
      'parcelas=' +
      this.state.parcelas +
      '&' +
      'valor=' +
      this.state.valor +
      '&' +
      'desconto=' +
      this.state.desconto +
      '&' +
      'tipoValor=' +
      this.state.tipoValor +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      'paciente=' +
      this.state.paciente +
      '&' +
      'cartao=' +
      this.state.cartao +
      '&' +
      'especialidade=' +
      this.state.especialidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      dataPedido,
      dataAgenda,
      qtdSessoes,
      parcelas,
      valor,
      desconto,
      tipoValor,
      unidade,
      paciente,
      cartao,
      especialidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      dataPedido,
      dataAgenda,
      qtdSessoes,
      parcelas,
      valor,
      desconto,
      tipoValor,
      unidade,
      paciente,
      cartao,
      especialidade,
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

const mapStateToProps = ({ pacientePedido, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  pacientes: storeState.paciente.entities,
  pacienteDadosCartaos: storeState.pacienteDadosCartao.entities,
  especialidades: storeState.especialidade.entities,
  pacientePedidoList: pacientePedido.entities,
  totalItems: pacientePedido.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getPacientes,
  getPacienteDadosCartaos,
  getEspecialidades,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacientePedido);
