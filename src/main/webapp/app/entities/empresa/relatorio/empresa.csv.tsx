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
import { getEmpresaState, IEmpresaBaseState, getEntitiesExport } from '../empresa.reducer';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';

export interface IEmpresaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEmpresaState extends IEmpresaBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class Empresa extends React.Component<IEmpresaProps, IEmpresaState> {
  private myFormRef: any;

  constructor(props: IEmpresaProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getEmpresaState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getCidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        empresa: '',
        nome: '',
        email: '',
        cpf: '',
        rg: '',
        nascimento: '',
        sexo: '',
        telefone1: '',
        telefone2: '',
        celular1: '',
        celular2: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        tipo: '',
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
      'empresa=' +
      this.state.empresa +
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
      'nascimento=' +
      this.state.nascimento +
      '&' +
      'sexo=' +
      this.state.sexo +
      '&' +
      'telefone1=' +
      this.state.telefone1 +
      '&' +
      'telefone2=' +
      this.state.telefone2 +
      '&' +
      'celular1=' +
      this.state.celular1 +
      '&' +
      'celular2=' +
      this.state.celular2 +
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
      'cidade=' +
      this.state.cidade +
      '&' +
      'uf=' +
      this.state.uf +
      '&' +
      'tipo=' +
      this.state.tipo +
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
      empresa,
      nome,
      email,
      cpf,
      rg,
      nascimento,
      sexo,
      telefone1,
      telefone2,
      celular1,
      celular2,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      tipo,
      cidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      empresa,
      nome,
      email,
      cpf,
      rg,
      nascimento,
      sexo,
      telefone1,
      telefone2,
      celular1,
      celular2,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      tipo,
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

const mapStateToProps = ({ empresa, ...storeState }: IRootState) => ({
  cidades: storeState.cidade.entities,
  empresaList: empresa.entities,
  totalItems: empresa.totalItems
});

const mapDispatchToProps = {
  getCidades,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Empresa);
