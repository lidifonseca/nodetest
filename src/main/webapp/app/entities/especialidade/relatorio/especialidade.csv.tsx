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
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getEspecialidadeState, IEspecialidadeBaseState, getEntitiesExport } from '../especialidade.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import { ITipoEspecialidade } from 'app/shared/model/tipo-especialidade.model';
import { getEntities as getTipoEspecialidades } from 'app/entities/tipo-especialidade/tipo-especialidade.reducer';
import { ITipoUnidade } from 'app/shared/model/tipo-unidade.model';
import { getEntities as getTipoUnidades } from 'app/entities/tipo-unidade/tipo-unidade.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';

export interface IEspecialidadeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEspecialidadeState extends IEspecialidadeBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class Especialidade extends React.Component<IEspecialidadeProps, IEspecialidadeState> {
  private myFormRef: any;

  constructor(props: IEspecialidadeProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getEspecialidadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getCategorias();
    this.props.getTipoEspecialidades();
    this.props.getTipoUnidades();
    this.props.getProfissionals();
  }

  cancelCourse = () => {
    this.setState(
      {
        icon: '',
        especialidade: '',
        descricao: '',
        duracao: '',
        importante: '',
        ativo: '',
        atendimento: '',
        especialidadeOperadora: '',
        especialidadeUnidade: '',
        especialidadeValor: '',
        pacientePedido: '',
        padItem: '',
        unidade: '',
        categoria: '',
        tipoEspecialidade: '',
        tipoUnidade: '',
        profissional: ''
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
      'icon=' +
      this.state.icon +
      '&' +
      'especialidade=' +
      this.state.especialidade +
      '&' +
      'descricao=' +
      this.state.descricao +
      '&' +
      'duracao=' +
      this.state.duracao +
      '&' +
      'importante=' +
      this.state.importante +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      'especialidadeOperadora=' +
      this.state.especialidadeOperadora +
      '&' +
      'especialidadeUnidade=' +
      this.state.especialidadeUnidade +
      '&' +
      'especialidadeValor=' +
      this.state.especialidadeValor +
      '&' +
      'pacientePedido=' +
      this.state.pacientePedido +
      '&' +
      'padItem=' +
      this.state.padItem +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      'categoria=' +
      this.state.categoria +
      '&' +
      'tipoEspecialidade=' +
      this.state.tipoEspecialidade +
      '&' +
      'tipoUnidade=' +
      this.state.tipoUnidade +
      '&' +
      'profissional=' +
      this.state.profissional +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      icon,
      especialidade,
      descricao,
      duracao,
      importante,
      ativo,
      atendimento,
      especialidadeOperadora,
      especialidadeUnidade,
      especialidadeValor,
      pacientePedido,
      padItem,
      unidade,
      categoria,
      tipoEspecialidade,
      tipoUnidade,
      profissional,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      icon,
      especialidade,
      descricao,
      duracao,
      importante,
      ativo,
      atendimento,
      especialidadeOperadora,
      especialidadeUnidade,
      especialidadeValor,
      pacientePedido,
      padItem,
      unidade,
      categoria,
      tipoEspecialidade,
      tipoUnidade,
      profissional,
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

const mapStateToProps = ({ especialidade, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  categorias: storeState.categoria.entities,
  tipoEspecialidades: storeState.tipoEspecialidade.entities,
  tipoUnidades: storeState.tipoUnidade.entities,
  profissionals: storeState.profissional.entities,
  especialidadeList: especialidade.entities,
  totalItems: especialidade.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getCategorias,
  getTipoEspecialidades,
  getTipoUnidades,
  getProfissionals,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Especialidade);
