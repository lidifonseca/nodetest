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
import { getUnidadeEasyState, IUnidadeEasyBaseState, getEntitiesExport } from '../unidade-easy.reducer';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';

export interface IUnidadeEasyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUnidadeEasyState extends IUnidadeEasyBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class UnidadeEasy extends React.Component<IUnidadeEasyProps, IUnidadeEasyState> {
  private myFormRef: any;

  constructor(props: IUnidadeEasyProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getUnidadeEasyState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getCategorias();
  }

  cancelCourse = () => {
    this.setState(
      {
        razaoSocial: '',
        nomeFantasia: '',
        cnpj: '',
        ie: '',
        telefone1: '',
        telefone2: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
        regans: '',
        regcnes: '',
        tissresponsavel: '',
        tissconselho: '',
        tissinscricao: '',
        tisscbo: '',
        tisscoduf: '',
        ativo: '',
        categoria: ''
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
      'razaoSocial=' +
      this.state.razaoSocial +
      '&' +
      'nomeFantasia=' +
      this.state.nomeFantasia +
      '&' +
      'cnpj=' +
      this.state.cnpj +
      '&' +
      'ie=' +
      this.state.ie +
      '&' +
      'telefone1=' +
      this.state.telefone1 +
      '&' +
      'telefone2=' +
      this.state.telefone2 +
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
      'cep=' +
      this.state.cep +
      '&' +
      'regans=' +
      this.state.regans +
      '&' +
      'regcnes=' +
      this.state.regcnes +
      '&' +
      'tissresponsavel=' +
      this.state.tissresponsavel +
      '&' +
      'tissconselho=' +
      this.state.tissconselho +
      '&' +
      'tissinscricao=' +
      this.state.tissinscricao +
      '&' +
      'tisscbo=' +
      this.state.tisscbo +
      '&' +
      'tisscoduf=' +
      this.state.tisscoduf +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'categoria=' +
      this.state.categoria +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      razaoSocial,
      nomeFantasia,
      cnpj,
      ie,
      telefone1,
      telefone2,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
      regans,
      regcnes,
      tissresponsavel,
      tissconselho,
      tissinscricao,
      tisscbo,
      tisscoduf,
      ativo,
      categoria,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      razaoSocial,
      nomeFantasia,
      cnpj,
      ie,
      telefone1,
      telefone2,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
      regans,
      regcnes,
      tissresponsavel,
      tissconselho,
      tissinscricao,
      tisscbo,
      tisscoduf,
      ativo,
      categoria,
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

const mapStateToProps = ({ unidadeEasy, ...storeState }: IRootState) => ({
  categorias: storeState.categoria.entities,
  unidadeEasyList: unidadeEasy.entities,
  totalItems: unidadeEasy.totalItems
});

const mapDispatchToProps = {
  getCategorias,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeEasy);
