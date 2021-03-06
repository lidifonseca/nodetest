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
import { getRespostasState, IRespostasBaseState, getEntitiesExport } from '../respostas.reducer';
import { IRespostas } from 'app/shared/model/respostas.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';
import { getEntities as getPerguntasQuestionarios } from 'app/entities/perguntas-questionario/perguntas-questionario.reducer';

export interface IRespostasProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IRespostasState extends IRespostasBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class Respostas extends React.Component<IRespostasProps, IRespostasState> {
  private myFormRef: any;

  constructor(props: IRespostasProps) {
    super(props);
    this.state = {
      exportData: null,
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getRespostasState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getPerguntasQuestionarios();
  }

  cancelCourse = () => {
    this.setState(
      {
        resposta: '',
        pontuacao: '',
        respostaAtiva: '',
        acoesRespostas: '',
        perguntasQuestionario: ''
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
      'resposta=' +
      this.state.resposta +
      '&' +
      'pontuacao=' +
      this.state.pontuacao +
      '&' +
      'respostaAtiva=' +
      this.state.respostaAtiva +
      '&' +
      'acoesRespostas=' +
      this.state.acoesRespostas +
      '&' +
      'perguntasQuestionario=' +
      this.state.perguntasQuestionario +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { resposta, pontuacao, respostaAtiva, acoesRespostas, perguntasQuestionario, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntitiesExport(
      resposta,
      pontuacao,
      respostaAtiva,
      acoesRespostas,
      perguntasQuestionario,
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

const mapStateToProps = ({ respostas, ...storeState }: IRootState) => ({
  perguntasQuestionarios: storeState.perguntasQuestionario.entities,
  respostasList: respostas.entities,
  totalItems: respostas.totalItems
});

const mapDispatchToProps = {
  getPerguntasQuestionarios,
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Respostas);
