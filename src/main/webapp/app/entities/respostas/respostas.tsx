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
import { Translate, translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getRespostasState, IRespostasBaseState, getEntities } from './respostas.reducer';
import { IRespostas } from 'app/shared/model/respostas.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';
import { getEntities as getPerguntasQuestionarios } from 'app/entities/perguntas-questionario/perguntas-questionario.reducer';

export interface IRespostasProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IRespostasState extends IRespostasBaseState, IPaginationBaseState {}

export class Respostas extends React.Component<IRespostasProps, IRespostasState> {
  private myFormRef: any;

  constructor(props: IRespostasProps) {
    super(props);
    this.state = {
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
    this.props.getEntities(
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

  render() {
    const { perguntasQuestionarios, respostasList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Respostas</span>
          <Button id="togglerFilterRespostas" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.respostas.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.respostas.home.createLabel">Create a new Respostas</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Respostas</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterRespostas">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'resposta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="respostaLabel" for="respostas-resposta">
                              <Translate contentKey="generadorApp.respostas.resposta">Resposta</Translate>
                            </Label>

                            <AvInput type="text" name="resposta" id="respostas-resposta" value={this.state.resposta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'pontuacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pontuacaoLabel" for="respostas-pontuacao">
                              <Translate contentKey="generadorApp.respostas.pontuacao">Pontuacao</Translate>
                            </Label>
                            <AvInput type="string" name="pontuacao" id="respostas-pontuacao" value={this.state.pontuacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'respostaAtiva' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="respostaAtivaLabel" check>
                              <AvInput id="respostas-respostaAtiva" type="checkbox" className="form-control" name="respostaAtiva" />
                              <Translate contentKey="generadorApp.respostas.respostaAtiva">Resposta Ativa</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'acoesRespostas' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'perguntasQuestionario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="respostas-perguntasQuestionario">
                                <Translate contentKey="generadorApp.respostas.perguntasQuestionario">Perguntas Questionario</Translate>
                              </Label>
                              <Select
                                id="respostas-perguntasQuestionario"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  perguntasQuestionarios
                                    ? perguntasQuestionarios.map(p =>
                                        this.state.perguntasQuestionario.split(',').indexOf(p.id) !== -1
                                          ? { value: p.id, label: p.id }
                                          : null
                                      )
                                    : null
                                }
                                options={
                                  perguntasQuestionarios
                                    ? perguntasQuestionarios.map(option => ({ value: option.id, label: option.id }))
                                    : null
                                }
                                onChange={options =>
                                  this.setState({ perguntasQuestionario: options.map(option => option['value']).join(',') })
                                }
                                name={'perguntasQuestionario'}
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
                        <Translate contentKey="generadorApp.respostas.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.respostas.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {respostasList && respostasList.length > 0 ? (
                <Table responsive aria-describedby="respostas-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'resposta' ? (
                        <th className="hand" onClick={this.sort('resposta')}>
                          <Translate contentKey="generadorApp.respostas.resposta">Resposta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pontuacao' ? (
                        <th className="hand" onClick={this.sort('pontuacao')}>
                          <Translate contentKey="generadorApp.respostas.pontuacao">Pontuacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'respostaAtiva' ? (
                        <th className="hand" onClick={this.sort('respostaAtiva')}>
                          <Translate contentKey="generadorApp.respostas.respostaAtiva">Resposta Ativa</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'perguntasQuestionario' ? (
                        <th>
                          <Translate contentKey="generadorApp.respostas.perguntasQuestionario">Perguntas Questionario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {respostasList.map((respostas, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${respostas.id}`} color="link" size="sm">
                            {respostas.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'resposta' ? <td>{respostas.resposta}</td> : null}

                        {this.state.baseFilters !== 'pontuacao' ? <td>{respostas.pontuacao}</td> : null}

                        {this.state.baseFilters !== 'respostaAtiva' ? <td>{respostas.respostaAtiva ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'perguntasQuestionario' ? (
                          <td>
                            {respostas.perguntasQuestionario ? (
                              <Link to={`perguntas-questionario/${respostas.perguntasQuestionario.id}`}>
                                {respostas.perguntasQuestionario.id}
                              </Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${respostas.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${respostas.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${respostas.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.respostas.home.notFound">No Respostas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={respostasList && respostasList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ respostas, ...storeState }: IRootState) => ({
  perguntasQuestionarios: storeState.perguntasQuestionario.entities,
  respostasList: respostas.entities,
  totalItems: respostas.totalItems
});

const mapDispatchToProps = {
  getPerguntasQuestionarios,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Respostas);
