/* eslint complexity: ["error", 300] */
import React from 'react';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { connect } from 'react-redux';
import Select from 'react-select';
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
import { getQuestionariosState, IQuestionariosBaseState, getEntities } from './questionarios.reducer';
import { IQuestionarios } from 'app/shared/model/questionarios.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';

export interface IQuestionariosProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IQuestionariosState extends IQuestionariosBaseState, IPaginationBaseState {}

export class Questionarios extends React.Component<IQuestionariosProps, IQuestionariosState> {
  private myFormRef: any;

  constructor(props: IQuestionariosProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getQuestionariosState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getPacientes();
  }

  cancelCourse = () => {
    this.setState(
      {
        dataCadastro: '',
        etapaAtual: '',
        finalizado: '',
        ultimaPerguntaRespondida: '',
        respostasQuestionarios: '',
        paciente: ''
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
      'baseFilters=' +
      this.state.baseFilters +
      '&page=' +
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
      'dataCadastro=' +
      this.state.dataCadastro +
      '&' +
      'etapaAtual=' +
      this.state.etapaAtual +
      '&' +
      'finalizado=' +
      this.state.finalizado +
      '&' +
      'ultimaPerguntaRespondida=' +
      this.state.ultimaPerguntaRespondida +
      '&' +
      'respostasQuestionarios=' +
      this.state.respostasQuestionarios +
      '&' +
      'paciente=' +
      this.state.paciente +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      dataCadastro,
      etapaAtual,
      finalizado,
      ultimaPerguntaRespondida,
      respostasQuestionarios,
      paciente,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      dataCadastro,
      etapaAtual,
      finalizado,
      ultimaPerguntaRespondida,
      respostasQuestionarios,
      paciente,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pacientes, questionariosList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Questionarios</span>
          <Button id="togglerFilterQuestionarios" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.questionarios.home.btn_filter_open">Filters</Translate>
            &nbsp;
            <FontAwesomeIcon icon="caret-down" />
          </Button>{' '}
          &nbsp;
          <Link
            to={`${match.url}/new?${this.getFiltersURL()}`}
            className="btn btn-primary float-right jh-create-entity"
            id="jh-create-entity"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="generadorApp.questionarios.home.createLabel">Create a new Questionarios</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Questionarios</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterQuestionarios">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'dataCadastro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataCadastroLabel" for="questionarios-dataCadastro">
                              <Translate contentKey="generadorApp.questionarios.dataCadastro">Data Cadastro</Translate>
                            </Label>
                            <AvInput
                              id="questionarios-dataCadastro"
                              type="datetime-local"
                              className="form-control"
                              name="dataCadastro"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.dataCadastro ? convertDateTimeFromServer(this.state.dataCadastro) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'etapaAtual' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="etapaAtualLabel" for="questionarios-etapaAtual">
                              <Translate contentKey="generadorApp.questionarios.etapaAtual">Etapa Atual</Translate>
                            </Label>

                            <AvInput type="text" name="etapaAtual" id="questionarios-etapaAtual" value={this.state.etapaAtual} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'finalizado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="finalizadoLabel" check>
                              <AvInput id="questionarios-finalizado" type="checkbox" className="form-control" name="finalizado" />
                              <Translate contentKey="generadorApp.questionarios.finalizado">Finalizado</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ultimaPerguntaRespondida' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ultimaPerguntaRespondidaLabel" for="questionarios-ultimaPerguntaRespondida">
                              <Translate contentKey="generadorApp.questionarios.ultimaPerguntaRespondida">
                                Ultima Pergunta Respondida
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ultimaPerguntaRespondida"
                              id="questionarios-ultimaPerguntaRespondida"
                              value={this.state.ultimaPerguntaRespondida}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'respostasQuestionarios' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="questionarios-paciente">
                                <Translate contentKey="generadorApp.questionarios.paciente">Paciente</Translate>
                              </Label>
                              <Select
                                id="questionarios-paciente"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  pacientes
                                    ? pacientes.map(p =>
                                        this.state.paciente.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.nome } : null
                                      )
                                    : null
                                }
                                options={pacientes ? pacientes.map(option => ({ value: option.id, label: option.nome })) : null}
                                onChange={options => this.setState({ paciente: options.map(option => option['value']).join(',') })}
                                name={'paciente'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.questionarios.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.questionarios.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {questionariosList && questionariosList.length > 0 ? (
                <Table responsive aria-describedby="questionarios-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'dataCadastro' ? (
                        <th className="hand" onClick={this.sort('dataCadastro')}>
                          <Translate contentKey="generadorApp.questionarios.dataCadastro">Data Cadastro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'etapaAtual' ? (
                        <th className="hand" onClick={this.sort('etapaAtual')}>
                          <Translate contentKey="generadorApp.questionarios.etapaAtual">Etapa Atual</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'finalizado' ? (
                        <th className="hand" onClick={this.sort('finalizado')}>
                          <Translate contentKey="generadorApp.questionarios.finalizado">Finalizado</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ultimaPerguntaRespondida' ? (
                        <th className="hand" onClick={this.sort('ultimaPerguntaRespondida')}>
                          <Translate contentKey="generadorApp.questionarios.ultimaPerguntaRespondida">Ultima Pergunta Respondida</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <th>
                          <Translate contentKey="generadorApp.questionarios.paciente">Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {questionariosList.map((questionarios, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${questionarios.id}`} color="link" size="sm">
                            {questionarios.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'dataCadastro' ? (
                          <td>
                            <TextFormat type="date" value={questionarios.dataCadastro} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'etapaAtual' ? <td>{questionarios.etapaAtual}</td> : null}

                        {this.state.baseFilters !== 'finalizado' ? <td>{questionarios.finalizado ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ultimaPerguntaRespondida' ? <td>{questionarios.ultimaPerguntaRespondida}</td> : null}

                        {this.state.baseFilters !== 'paciente' ? (
                          <td>
                            {questionarios.paciente ? (
                              <Link to={`paciente/${questionarios.paciente.id}`}>{questionarios.paciente.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${questionarios.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${questionarios.id}/edit?${this.getFiltersURL()}`}
                              color="primary"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${questionarios.id}/delete?${this.getFiltersURL()}`}
                              color="danger"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="trash" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.delete">Delete</Translate>
                              </span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-warning">
                  <Translate contentKey="generadorApp.questionarios.home.notFound">No Questionarios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={questionariosList && questionariosList.length > 0 ? '' : 'd-none'}>
              <Row className="justify-content-center">
                <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
              </Row>
              <Row className="justify-content-center">
                <JhiPagination
                  activePage={this.state.activePage}
                  onSelect={this.handlePagination}
                  maxButtons={5}
                  itemsPerPage={this.state.itemsPerPage}
                  totalItems={this.props.totalItems}
                />
              </Row>
            </div>
          </PanelFooter>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = ({ questionarios, ...storeState }: IRootState) => ({
  pacientes: storeState.paciente.entities,
  questionariosList: questionarios.entities,
  totalItems: questionarios.totalItems
});

const mapDispatchToProps = {
  getPacientes,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Questionarios);
