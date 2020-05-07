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
import { getUsuarioPainelGerencialState, IUsuarioPainelGerencialBaseState, getEntitiesExport } from '../usuario-painel-gerencial.reducer';
import { IUsuarioPainelGerencial } from 'app/shared/model/usuario-painel-gerencial.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IUsuarioPainelGerencialProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUsuarioPainelGerencialState extends IUsuarioPainelGerencialBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class UsuarioPainelGerencial extends React.Component<IUsuarioPainelGerencialProps, IUsuarioPainelGerencialState> {
  private myFormRef: any;

  constructor(props: IUsuarioPainelGerencialProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getUsuarioPainelGerencialState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        verCronicos: '',
        verPacientesAtivosCr: '',
        filtroPacientesAtivosCr: '',
        verNumHospCr: '',
        filtroNumHospCr: '',
        verNumDesospCr: '',
        filtroNumDesospCr: '',
        verNumPsCr: '',
        filtroNumPsCr: '',
        verNumObitoCr: '',
        filtroNumObitoCr: '',
        verIndCliEstaveisCr: '',
        filtroIndCliEstaveisCr: '',
        verNumConsMedInternasCr: '',
        filtroNumConsMedInternasCr: '',
        verNumConsMedExternasCr: '',
        filtroNumConsMedExternasCr: '',
        verNumLaboratorialCr: '',
        filtroNumLaboratorialCr: '',
        verNumImagemCr: '',
        filtroNumImagemCr: '',
        verNumOutrosCr: '',
        filtroNumOutrosCr: '',
        verNumAtCatCr: '',
        filtroNumAtCatCr: '',
        verNumCatCompCr: '',
        filtroNumCatCompCr: '',
        verAtCmSucessoCr: '',
        filtroAtCmSucessoCr: '',
        verMediaPadAbertoCr: '',
        filtroMediaPadAbertoCr: '',
        verAtIntercorrenciaCr: '',
        filtroAtIntercorrenciaCr: '',
        verTempoMedioAtCr: '',
        filtroTempoMedioAtCr: '',
        verMediaPtaCr: '',
        filtroMediaPtaCr: '',
        verIndicadorUsoAppCr: '',
        filtroIndicadorUsoAppCr: ''
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
      'verCronicos=' +
      this.state.verCronicos +
      '&' +
      'verPacientesAtivosCr=' +
      this.state.verPacientesAtivosCr +
      '&' +
      'filtroPacientesAtivosCr=' +
      this.state.filtroPacientesAtivosCr +
      '&' +
      'verNumHospCr=' +
      this.state.verNumHospCr +
      '&' +
      'filtroNumHospCr=' +
      this.state.filtroNumHospCr +
      '&' +
      'verNumDesospCr=' +
      this.state.verNumDesospCr +
      '&' +
      'filtroNumDesospCr=' +
      this.state.filtroNumDesospCr +
      '&' +
      'verNumPsCr=' +
      this.state.verNumPsCr +
      '&' +
      'filtroNumPsCr=' +
      this.state.filtroNumPsCr +
      '&' +
      'verNumObitoCr=' +
      this.state.verNumObitoCr +
      '&' +
      'filtroNumObitoCr=' +
      this.state.filtroNumObitoCr +
      '&' +
      'verIndCliEstaveisCr=' +
      this.state.verIndCliEstaveisCr +
      '&' +
      'filtroIndCliEstaveisCr=' +
      this.state.filtroIndCliEstaveisCr +
      '&' +
      'verNumConsMedInternasCr=' +
      this.state.verNumConsMedInternasCr +
      '&' +
      'filtroNumConsMedInternasCr=' +
      this.state.filtroNumConsMedInternasCr +
      '&' +
      'verNumConsMedExternasCr=' +
      this.state.verNumConsMedExternasCr +
      '&' +
      'filtroNumConsMedExternasCr=' +
      this.state.filtroNumConsMedExternasCr +
      '&' +
      'verNumLaboratorialCr=' +
      this.state.verNumLaboratorialCr +
      '&' +
      'filtroNumLaboratorialCr=' +
      this.state.filtroNumLaboratorialCr +
      '&' +
      'verNumImagemCr=' +
      this.state.verNumImagemCr +
      '&' +
      'filtroNumImagemCr=' +
      this.state.filtroNumImagemCr +
      '&' +
      'verNumOutrosCr=' +
      this.state.verNumOutrosCr +
      '&' +
      'filtroNumOutrosCr=' +
      this.state.filtroNumOutrosCr +
      '&' +
      'verNumAtCatCr=' +
      this.state.verNumAtCatCr +
      '&' +
      'filtroNumAtCatCr=' +
      this.state.filtroNumAtCatCr +
      '&' +
      'verNumCatCompCr=' +
      this.state.verNumCatCompCr +
      '&' +
      'filtroNumCatCompCr=' +
      this.state.filtroNumCatCompCr +
      '&' +
      'verAtCmSucessoCr=' +
      this.state.verAtCmSucessoCr +
      '&' +
      'filtroAtCmSucessoCr=' +
      this.state.filtroAtCmSucessoCr +
      '&' +
      'verMediaPadAbertoCr=' +
      this.state.verMediaPadAbertoCr +
      '&' +
      'filtroMediaPadAbertoCr=' +
      this.state.filtroMediaPadAbertoCr +
      '&' +
      'verAtIntercorrenciaCr=' +
      this.state.verAtIntercorrenciaCr +
      '&' +
      'filtroAtIntercorrenciaCr=' +
      this.state.filtroAtIntercorrenciaCr +
      '&' +
      'verTempoMedioAtCr=' +
      this.state.verTempoMedioAtCr +
      '&' +
      'filtroTempoMedioAtCr=' +
      this.state.filtroTempoMedioAtCr +
      '&' +
      'verMediaPtaCr=' +
      this.state.verMediaPtaCr +
      '&' +
      'filtroMediaPtaCr=' +
      this.state.filtroMediaPtaCr +
      '&' +
      'verIndicadorUsoAppCr=' +
      this.state.verIndicadorUsoAppCr +
      '&' +
      'filtroIndicadorUsoAppCr=' +
      this.state.filtroIndicadorUsoAppCr +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      verCronicos,
      verPacientesAtivosCr,
      filtroPacientesAtivosCr,
      verNumHospCr,
      filtroNumHospCr,
      verNumDesospCr,
      filtroNumDesospCr,
      verNumPsCr,
      filtroNumPsCr,
      verNumObitoCr,
      filtroNumObitoCr,
      verIndCliEstaveisCr,
      filtroIndCliEstaveisCr,
      verNumConsMedInternasCr,
      filtroNumConsMedInternasCr,
      verNumConsMedExternasCr,
      filtroNumConsMedExternasCr,
      verNumLaboratorialCr,
      filtroNumLaboratorialCr,
      verNumImagemCr,
      filtroNumImagemCr,
      verNumOutrosCr,
      filtroNumOutrosCr,
      verNumAtCatCr,
      filtroNumAtCatCr,
      verNumCatCompCr,
      filtroNumCatCompCr,
      verAtCmSucessoCr,
      filtroAtCmSucessoCr,
      verMediaPadAbertoCr,
      filtroMediaPadAbertoCr,
      verAtIntercorrenciaCr,
      filtroAtIntercorrenciaCr,
      verTempoMedioAtCr,
      filtroTempoMedioAtCr,
      verMediaPtaCr,
      filtroMediaPtaCr,
      verIndicadorUsoAppCr,
      filtroIndicadorUsoAppCr,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      verCronicos,
      verPacientesAtivosCr,
      filtroPacientesAtivosCr,
      verNumHospCr,
      filtroNumHospCr,
      verNumDesospCr,
      filtroNumDesospCr,
      verNumPsCr,
      filtroNumPsCr,
      verNumObitoCr,
      filtroNumObitoCr,
      verIndCliEstaveisCr,
      filtroIndCliEstaveisCr,
      verNumConsMedInternasCr,
      filtroNumConsMedInternasCr,
      verNumConsMedExternasCr,
      filtroNumConsMedExternasCr,
      verNumLaboratorialCr,
      filtroNumLaboratorialCr,
      verNumImagemCr,
      filtroNumImagemCr,
      verNumOutrosCr,
      filtroNumOutrosCr,
      verNumAtCatCr,
      filtroNumAtCatCr,
      verNumCatCompCr,
      filtroNumCatCompCr,
      verAtCmSucessoCr,
      filtroAtCmSucessoCr,
      verMediaPadAbertoCr,
      filtroMediaPadAbertoCr,
      verAtIntercorrenciaCr,
      filtroAtIntercorrenciaCr,
      verTempoMedioAtCr,
      filtroTempoMedioAtCr,
      verMediaPtaCr,
      filtroMediaPtaCr,
      verIndicadorUsoAppCr,
      filtroIndicadorUsoAppCr,
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

const mapStateToProps = ({ usuarioPainelGerencial, ...storeState }: IRootState) => ({
  usuarioPainelGerencialList: usuarioPainelGerencial.entities,
  totalItems: usuarioPainelGerencial.totalItems
});

const mapDispatchToProps = {
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioPainelGerencial);
