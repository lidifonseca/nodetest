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
  getCidXPtaNovoPadItemIndiState,
  ICidXPtaNovoPadItemIndiBaseState,
  getEntitiesExport
} from '../cid-x-pta-novo-pad-item-indi.reducer';
import { ICidXPtaNovoPadItemIndi } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPadItemIndicadores } from 'app/shared/model/pad-item-indicadores.model';
import { getEntities as getPadItemIndicadores } from 'app/entities/pad-item-indicadores/pad-item-indicadores.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';
import { getEntities as getCidXPtaNovos } from 'app/entities/cid-x-pta-novo/cid-x-pta-novo.reducer';

export interface ICidXPtaNovoPadItemIndiProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICidXPtaNovoPadItemIndiState extends ICidXPtaNovoPadItemIndiBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class CidXPtaNovoPadItemIndi extends React.Component<ICidXPtaNovoPadItemIndiProps, ICidXPtaNovoPadItemIndiState> {
  private myFormRef: any;

  constructor(props: ICidXPtaNovoPadItemIndiProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getCidXPtaNovoPadItemIndiState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getPadItemIndicadores();
    this.props.getCategorias();
    this.props.getCidXPtaNovos();
  }

  cancelCourse = () => {
    this.setState(
      {
        meta: '',
        maximo: '',
        minimo: '',
        unidadeMedidaExtra: '',
        unidadeMedidaId: '',
        score: '',
        alertasIndicadores: '',
        padItemIndicadores: '',
        categorias: '',
        cidXPtaNovo: ''
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
      'meta=' +
      this.state.meta +
      '&' +
      'maximo=' +
      this.state.maximo +
      '&' +
      'minimo=' +
      this.state.minimo +
      '&' +
      'unidadeMedidaExtra=' +
      this.state.unidadeMedidaExtra +
      '&' +
      'unidadeMedidaId=' +
      this.state.unidadeMedidaId +
      '&' +
      'score=' +
      this.state.score +
      '&' +
      'alertasIndicadores=' +
      this.state.alertasIndicadores +
      '&' +
      'padItemIndicadores=' +
      this.state.padItemIndicadores +
      '&' +
      'categorias=' +
      this.state.categorias +
      '&' +
      'cidXPtaNovo=' +
      this.state.cidXPtaNovo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      meta,
      maximo,
      minimo,
      unidadeMedidaExtra,
      unidadeMedidaId,
      score,
      alertasIndicadores,
      padItemIndicadores,
      categorias,
      cidXPtaNovo,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      meta,
      maximo,
      minimo,
      unidadeMedidaExtra,
      unidadeMedidaId,
      score,
      alertasIndicadores,
      padItemIndicadores,
      categorias,
      cidXPtaNovo,
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

const mapStateToProps = ({ cidXPtaNovoPadItemIndi, ...storeState }: IRootState) => ({
  padItemIndicadores: storeState.padItemIndicadores.entities,
  categorias: storeState.categoria.entities,
  cidXPtaNovos: storeState.cidXPtaNovo.entities,
  cidXPtaNovoPadItemIndiList: cidXPtaNovoPadItemIndi.entities,
  totalItems: cidXPtaNovoPadItemIndi.totalItems
});

const mapDispatchToProps = {
  getPadItemIndicadores,
  getCategorias,
  getCidXPtaNovos,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoPadItemIndi);
