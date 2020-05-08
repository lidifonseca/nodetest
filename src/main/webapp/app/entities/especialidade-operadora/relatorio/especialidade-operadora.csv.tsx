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
import { getEspecialidadeOperadoraState, IEspecialidadeOperadoraBaseState, getEntitiesExport } from '../especialidade-operadora.reducer';
import { IEspecialidadeOperadora } from 'app/shared/model/especialidade-operadora.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';

export interface IEspecialidadeOperadoraProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEspecialidadeOperadoraState extends IEspecialidadeOperadoraBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class EspecialidadeOperadora extends React.Component<IEspecialidadeOperadoraProps, IEspecialidadeOperadoraState> {
  private myFormRef: any;

  constructor(props: IEspecialidadeOperadoraProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getEspecialidadeOperadoraState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getOperadoras();
    this.props.getEspecialidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        codTuss: '',
        codDespesa: '',
        codTabela: '',
        valorCusto: '',
        valorVenda: '',
        descontoCusto: '',
        descontoVenda: '',
        ativo: '',
        operadora: '',
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
      'codTuss=' +
      this.state.codTuss +
      '&' +
      'codDespesa=' +
      this.state.codDespesa +
      '&' +
      'codTabela=' +
      this.state.codTabela +
      '&' +
      'valorCusto=' +
      this.state.valorCusto +
      '&' +
      'valorVenda=' +
      this.state.valorVenda +
      '&' +
      'descontoCusto=' +
      this.state.descontoCusto +
      '&' +
      'descontoVenda=' +
      this.state.descontoVenda +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'operadora=' +
      this.state.operadora +
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
      codTuss,
      codDespesa,
      codTabela,
      valorCusto,
      valorVenda,
      descontoCusto,
      descontoVenda,
      ativo,
      operadora,
      especialidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      codTuss,
      codDespesa,
      codTabela,
      valorCusto,
      valorVenda,
      descontoCusto,
      descontoVenda,
      ativo,
      operadora,
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

const mapStateToProps = ({ especialidadeOperadora, ...storeState }: IRootState) => ({
  operadoras: storeState.operadora.entities,
  especialidades: storeState.especialidade.entities,
  especialidadeOperadoraList: especialidadeOperadora.entities,
  totalItems: especialidadeOperadora.totalItems
});

const mapDispatchToProps = {
  getOperadoras,
  getEspecialidades,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadeOperadora);
