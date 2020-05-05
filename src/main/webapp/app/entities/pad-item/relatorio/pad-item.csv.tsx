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
import { getPadItemState, IPadItemBaseState, getEntitiesExport } from '../pad-item.reducer';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPad } from 'app/shared/model/pad.model';
import { getEntities as getPads } from 'app/entities/pad/pad.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import { IPeriodicidade } from 'app/shared/model/periodicidade.model';
import { getEntities as getPeriodicidades } from 'app/entities/periodicidade/periodicidade.reducer';
import { IPeriodo } from 'app/shared/model/periodo.model';
import { getEntities as getPeriodos } from 'app/entities/periodo/periodo.reducer';

export interface IPadItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadItemState extends IPadItemBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class PadItem extends React.Component<IPadItemProps, IPadItemState> {
  private myFormRef: any;

  constructor(props: IPadItemProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPadItemState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getPads();
    this.props.getEspecialidades();
    this.props.getPeriodicidades();
    this.props.getPeriodos();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPedido: '',
        dataInicio: '',
        dataFim: '',
        qtdSessoes: '',
        observacao: '',
        sub: '',
        ativo: '',
        dataPadItemIncompleto: '',
        dataPadItemCompleto: '',
        numGhc: '',
        cidXPtaNovo: '',
        categoriaId: '',
        score: '',
        atendimento: '',
        atendimentoCepRecusado: '',
        atendimentoSorteioFeito: '',
        padItemAtividade: '',
        padItemCepRecusado: '',
        padItemResultado: '',
        padItemSorteioFeito: '',
        idPad: '',
        idEspecialidade: '',
        idPeriodicidade: '',
        idPeriodo: ''
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
      'idPedido=' +
      this.state.idPedido +
      '&' +
      'dataInicio=' +
      this.state.dataInicio +
      '&' +
      'dataFim=' +
      this.state.dataFim +
      '&' +
      'qtdSessoes=' +
      this.state.qtdSessoes +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      'sub=' +
      this.state.sub +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataPadItemIncompleto=' +
      this.state.dataPadItemIncompleto +
      '&' +
      'dataPadItemCompleto=' +
      this.state.dataPadItemCompleto +
      '&' +
      'numGhc=' +
      this.state.numGhc +
      '&' +
      'cidXPtaNovo=' +
      this.state.cidXPtaNovo +
      '&' +
      'categoriaId=' +
      this.state.categoriaId +
      '&' +
      'score=' +
      this.state.score +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      'atendimentoCepRecusado=' +
      this.state.atendimentoCepRecusado +
      '&' +
      'atendimentoSorteioFeito=' +
      this.state.atendimentoSorteioFeito +
      '&' +
      'padItemAtividade=' +
      this.state.padItemAtividade +
      '&' +
      'padItemCepRecusado=' +
      this.state.padItemCepRecusado +
      '&' +
      'padItemResultado=' +
      this.state.padItemResultado +
      '&' +
      'padItemSorteioFeito=' +
      this.state.padItemSorteioFeito +
      '&' +
      'idPad=' +
      this.state.idPad +
      '&' +
      'idEspecialidade=' +
      this.state.idEspecialidade +
      '&' +
      'idPeriodicidade=' +
      this.state.idPeriodicidade +
      '&' +
      'idPeriodo=' +
      this.state.idPeriodo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idPedido,
      dataInicio,
      dataFim,
      qtdSessoes,
      observacao,
      sub,
      ativo,
      dataPadItemIncompleto,
      dataPadItemCompleto,
      numGhc,
      cidXPtaNovo,
      categoriaId,
      score,
      atendimento,
      atendimentoCepRecusado,
      atendimentoSorteioFeito,
      padItemAtividade,
      padItemCepRecusado,
      padItemResultado,
      padItemSorteioFeito,
      idPad,
      idEspecialidade,
      idPeriodicidade,
      idPeriodo,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      idPedido,
      dataInicio,
      dataFim,
      qtdSessoes,
      observacao,
      sub,
      ativo,
      dataPadItemIncompleto,
      dataPadItemCompleto,
      numGhc,
      cidXPtaNovo,
      categoriaId,
      score,
      atendimento,
      atendimentoCepRecusado,
      atendimentoSorteioFeito,
      padItemAtividade,
      padItemCepRecusado,
      padItemResultado,
      padItemSorteioFeito,
      idPad,
      idEspecialidade,
      idPeriodicidade,
      idPeriodo,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  async confirmExport() {
    /* eslint-disable require-await */
    const result = await this.getEntities();
    this.setState({
      exportData: result['value']['data']
    });
  }

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

const mapStateToProps = ({ padItem, ...storeState }: IRootState) => ({
  pads: storeState.pad.entities,
  especialidades: storeState.especialidade.entities,
  periodicidades: storeState.periodicidade.entities,
  periodos: storeState.periodo.entities,
  padItemList: padItem.entities,
  totalItems: padItem.totalItems
});

const mapDispatchToProps = {
  getPads,
  getEspecialidades,
  getPeriodicidades,
  getPeriodos,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItem);
