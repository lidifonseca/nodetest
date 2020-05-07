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
import { getPacienteProntuarioState, IPacienteProntuarioBaseState, getEntitiesExport } from '../paciente-prontuario.reducer';
import { IPacienteProntuario } from 'app/shared/model/paciente-prontuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteProntuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteProntuarioState extends IPacienteProntuarioBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class PacienteProntuario extends React.Component<IPacienteProntuarioProps, IPacienteProntuarioState> {
  private myFormRef: any;

  constructor(props: IPacienteProntuarioProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacienteProntuarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPaciente: '',
        idTipoProntuario: '',
        oQue: '',
        resultado: '',
        ativo: '',
        idEspecialidade: '',
        dataConsulta: '',
        idExame: '',
        idTipoExame: '',
        dataExame: '',
        dataInternacao: '',
        dataAlta: '',
        dataPs: '',
        dataOcorrencia: '',
        idOcorrenciaProntuario: '',
        dataManifestacao: ''
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
      'idTipoProntuario=' +
      this.state.idTipoProntuario +
      '&' +
      'oQue=' +
      this.state.oQue +
      '&' +
      'resultado=' +
      this.state.resultado +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'idEspecialidade=' +
      this.state.idEspecialidade +
      '&' +
      'dataConsulta=' +
      this.state.dataConsulta +
      '&' +
      'idExame=' +
      this.state.idExame +
      '&' +
      'idTipoExame=' +
      this.state.idTipoExame +
      '&' +
      'dataExame=' +
      this.state.dataExame +
      '&' +
      'dataInternacao=' +
      this.state.dataInternacao +
      '&' +
      'dataAlta=' +
      this.state.dataAlta +
      '&' +
      'dataPs=' +
      this.state.dataPs +
      '&' +
      'dataOcorrencia=' +
      this.state.dataOcorrencia +
      '&' +
      'idOcorrenciaProntuario=' +
      this.state.idOcorrenciaProntuario +
      '&' +
      'dataManifestacao=' +
      this.state.dataManifestacao +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idPaciente,
      idTipoProntuario,
      oQue,
      resultado,
      ativo,
      idEspecialidade,
      dataConsulta,
      idExame,
      idTipoExame,
      dataExame,
      dataInternacao,
      dataAlta,
      dataPs,
      dataOcorrencia,
      idOcorrenciaProntuario,
      dataManifestacao,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      idPaciente,
      idTipoProntuario,
      oQue,
      resultado,
      ativo,
      idEspecialidade,
      dataConsulta,
      idExame,
      idTipoExame,
      dataExame,
      dataInternacao,
      dataAlta,
      dataPs,
      dataOcorrencia,
      idOcorrenciaProntuario,
      dataManifestacao,
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

const mapStateToProps = ({ pacienteProntuario, ...storeState }: IRootState) => ({
  pacienteProntuarioList: pacienteProntuario.entities,
  totalItems: pacienteProntuario.totalItems
});

const mapDispatchToProps = {
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteProntuario);
