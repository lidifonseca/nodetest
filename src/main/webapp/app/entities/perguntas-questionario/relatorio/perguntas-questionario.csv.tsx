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
import { getPerguntasQuestionarioState, IPerguntasQuestionarioBaseState, getEntitiesExport } from '../perguntas-questionario.reducer';
import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ISegmentosPerguntas } from 'app/shared/model/segmentos-perguntas.model';
import { getEntities as getSegmentosPerguntas } from 'app/entities/segmentos-perguntas/segmentos-perguntas.reducer';

export interface IPerguntasQuestionarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPerguntasQuestionarioState extends IPerguntasQuestionarioBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class PerguntasQuestionario extends React.Component<IPerguntasQuestionarioProps, IPerguntasQuestionarioState> {
  private myFormRef: any;

  constructor(props: IPerguntasQuestionarioProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPerguntasQuestionarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getSegmentosPerguntas();
  }

  cancelCourse = () => {
    this.setState(
      {
        pergunta: '',
        tipoResposta: '',
        obrigatorio: '',
        tipoCampo: '',
        acoesRespostas: '',
        respostas: '',
        segmentosPerguntas: ''
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
      'pergunta=' +
      this.state.pergunta +
      '&' +
      'tipoResposta=' +
      this.state.tipoResposta +
      '&' +
      'obrigatorio=' +
      this.state.obrigatorio +
      '&' +
      'tipoCampo=' +
      this.state.tipoCampo +
      '&' +
      'acoesRespostas=' +
      this.state.acoesRespostas +
      '&' +
      'respostas=' +
      this.state.respostas +
      '&' +
      'segmentosPerguntas=' +
      this.state.segmentosPerguntas +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      pergunta,
      tipoResposta,
      obrigatorio,
      tipoCampo,
      acoesRespostas,
      respostas,
      segmentosPerguntas,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntitiesExport(
      pergunta,
      tipoResposta,
      obrigatorio,
      tipoCampo,
      acoesRespostas,
      respostas,
      segmentosPerguntas,
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

const mapStateToProps = ({ perguntasQuestionario, ...storeState }: IRootState) => ({
  segmentosPerguntas: storeState.segmentosPerguntas.entities,
  perguntasQuestionarioList: perguntasQuestionario.entities,
  totalItems: perguntasQuestionario.totalItems
});

const mapDispatchToProps = {
  getSegmentosPerguntas,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PerguntasQuestionario);
