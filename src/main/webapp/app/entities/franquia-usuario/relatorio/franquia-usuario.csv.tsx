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
import { getFranquiaUsuarioState, IFranquiaUsuarioBaseState, getEntitiesExport } from '../franquia-usuario.reducer';
import { IFranquiaUsuario } from 'app/shared/model/franquia-usuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';

export interface IFranquiaUsuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IFranquiaUsuarioState extends IFranquiaUsuarioBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class FranquiaUsuario extends React.Component<IFranquiaUsuarioProps, IFranquiaUsuarioState> {
  private myFormRef: any;

  constructor(props: IFranquiaUsuarioProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getFranquiaUsuarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getFranquias();
  }

  cancelCourse = () => {
    this.setState(
      {
        senha: '',
        nome: '',
        email: '',
        verProfissional: '',
        cadProfissional: '',
        ediProfissional: '',
        delProfissional: '',
        relProfissional: '',
        verPaciente: '',
        cadPaciente: '',
        ediPaciente: '',
        delPaciente: '',
        relPaciente: '',
        verPad: '',
        cadPad: '',
        ediPad: '',
        delPad: '',
        relPad: '',
        verAtendimento: '',
        cadAtendimento: '',
        ediAtendimento: '',
        delAtendimento: '',
        relAtendimento: '',
        verPush: '',
        cadPush: '',
        verEspecialidadeValor: '',
        cadEspecialidadeValor: '',
        ediEspecialidadeValor: '',
        delEspecialidadeValor: '',
        verUsuario: '',
        cadUsuario: '',
        ediUsuario: '',
        delUsuario: '',
        envioRecusa: '',
        envioIntercorrencia: '',
        envioCancelamento: '',
        ativo: '',
        logUserFranquia: '',
        franquia: ''
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
      'verProfissional=' +
      this.state.verProfissional +
      '&' +
      'cadProfissional=' +
      this.state.cadProfissional +
      '&' +
      'ediProfissional=' +
      this.state.ediProfissional +
      '&' +
      'delProfissional=' +
      this.state.delProfissional +
      '&' +
      'relProfissional=' +
      this.state.relProfissional +
      '&' +
      'verPaciente=' +
      this.state.verPaciente +
      '&' +
      'cadPaciente=' +
      this.state.cadPaciente +
      '&' +
      'ediPaciente=' +
      this.state.ediPaciente +
      '&' +
      'delPaciente=' +
      this.state.delPaciente +
      '&' +
      'relPaciente=' +
      this.state.relPaciente +
      '&' +
      'verPad=' +
      this.state.verPad +
      '&' +
      'cadPad=' +
      this.state.cadPad +
      '&' +
      'ediPad=' +
      this.state.ediPad +
      '&' +
      'delPad=' +
      this.state.delPad +
      '&' +
      'relPad=' +
      this.state.relPad +
      '&' +
      'verAtendimento=' +
      this.state.verAtendimento +
      '&' +
      'cadAtendimento=' +
      this.state.cadAtendimento +
      '&' +
      'ediAtendimento=' +
      this.state.ediAtendimento +
      '&' +
      'delAtendimento=' +
      this.state.delAtendimento +
      '&' +
      'relAtendimento=' +
      this.state.relAtendimento +
      '&' +
      'verPush=' +
      this.state.verPush +
      '&' +
      'cadPush=' +
      this.state.cadPush +
      '&' +
      'verEspecialidadeValor=' +
      this.state.verEspecialidadeValor +
      '&' +
      'cadEspecialidadeValor=' +
      this.state.cadEspecialidadeValor +
      '&' +
      'ediEspecialidadeValor=' +
      this.state.ediEspecialidadeValor +
      '&' +
      'delEspecialidadeValor=' +
      this.state.delEspecialidadeValor +
      '&' +
      'verUsuario=' +
      this.state.verUsuario +
      '&' +
      'cadUsuario=' +
      this.state.cadUsuario +
      '&' +
      'ediUsuario=' +
      this.state.ediUsuario +
      '&' +
      'delUsuario=' +
      this.state.delUsuario +
      '&' +
      'envioRecusa=' +
      this.state.envioRecusa +
      '&' +
      'envioIntercorrencia=' +
      this.state.envioIntercorrencia +
      '&' +
      'envioCancelamento=' +
      this.state.envioCancelamento +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'logUserFranquia=' +
      this.state.logUserFranquia +
      '&' +
      'franquia=' +
      this.state.franquia +
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
      verProfissional,
      cadProfissional,
      ediProfissional,
      delProfissional,
      relProfissional,
      verPaciente,
      cadPaciente,
      ediPaciente,
      delPaciente,
      relPaciente,
      verPad,
      cadPad,
      ediPad,
      delPad,
      relPad,
      verAtendimento,
      cadAtendimento,
      ediAtendimento,
      delAtendimento,
      relAtendimento,
      verPush,
      cadPush,
      verEspecialidadeValor,
      cadEspecialidadeValor,
      ediEspecialidadeValor,
      delEspecialidadeValor,
      verUsuario,
      cadUsuario,
      ediUsuario,
      delUsuario,
      envioRecusa,
      envioIntercorrencia,
      envioCancelamento,
      ativo,
      logUserFranquia,
      franquia,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      senha,
      nome,
      email,
      verProfissional,
      cadProfissional,
      ediProfissional,
      delProfissional,
      relProfissional,
      verPaciente,
      cadPaciente,
      ediPaciente,
      delPaciente,
      relPaciente,
      verPad,
      cadPad,
      ediPad,
      delPad,
      relPad,
      verAtendimento,
      cadAtendimento,
      ediAtendimento,
      delAtendimento,
      relAtendimento,
      verPush,
      cadPush,
      verEspecialidadeValor,
      cadEspecialidadeValor,
      ediEspecialidadeValor,
      delEspecialidadeValor,
      verUsuario,
      cadUsuario,
      ediUsuario,
      delUsuario,
      envioRecusa,
      envioIntercorrencia,
      envioCancelamento,
      ativo,
      logUserFranquia,
      franquia,
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

const mapStateToProps = ({ franquiaUsuario, ...storeState }: IRootState) => ({
  franquias: storeState.franquia.entities,
  franquiaUsuarioList: franquiaUsuario.entities,
  totalItems: franquiaUsuario.totalItems
});

const mapDispatchToProps = {
  getFranquias,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaUsuario);
