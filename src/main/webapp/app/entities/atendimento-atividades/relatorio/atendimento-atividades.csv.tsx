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
import { getAtendimentoAtividadesState, IAtendimentoAtividadesBaseState, getEntitiesExport } from '../atendimento-atividades.reducer';
import { IAtendimentoAtividades } from 'app/shared/model/atendimento-atividades.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { getEntities as getCategoriaAtividades } from 'app/entities/categoria-atividade/categoria-atividade.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { getEntities as getAtendimentos } from 'app/entities/atendimento/atendimento.reducer';

export interface IAtendimentoAtividadesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoAtividadesState extends IAtendimentoAtividadesBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class AtendimentoAtividades extends React.Component<IAtendimentoAtividadesProps, IAtendimentoAtividadesState> {
  private myFormRef: any;

  constructor(props: IAtendimentoAtividadesProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getAtendimentoAtividadesState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getCategoriaAtividades();
    this.props.getAtendimentos();
  }

  cancelCourse = () => {
    this.setState(
      {
        feito: '',
        atividade: '',
        atendimento: ''
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
      'feito=' +
      this.state.feito +
      '&' +
      'atividade=' +
      this.state.atividade +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { feito, atividade, atendimento, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntitiesExport(feito, atividade, atendimento, activePage - 1, itemsPerPage, `${sort},${order}`);
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

const mapStateToProps = ({ atendimentoAtividades, ...storeState }: IRootState) => ({
  categoriaAtividades: storeState.categoriaAtividade.entities,
  atendimentos: storeState.atendimento.entities,
  atendimentoAtividadesList: atendimentoAtividades.entities,
  totalItems: atendimentoAtividades.totalItems
});

const mapDispatchToProps = {
  getCategoriaAtividades,
  getAtendimentos,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAtividades);
