/* eslint complexity: ["error", 100] */
import React from 'react';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { connect } from 'react-redux';
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
import { getRespostasQuestionariosState, IRespostasQuestionariosBaseState, getEntities } from './respostas-questionarios.reducer';
import { IRespostasQuestionarios } from 'app/shared/model/respostas-questionarios.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IRespostasQuestionariosProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IRespostasQuestionariosState extends IRespostasQuestionariosBaseState, IPaginationBaseState {}

export class RespostasQuestionarios extends React.Component<IRespostasQuestionariosProps, IRespostasQuestionariosState> {
  private myFormRef: any;

  constructor(props: IRespostasQuestionariosProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getRespostasQuestionariosState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        dataResposta: '',
        informacaoAdicional: '',
        questionarioId: ''
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
      'dataResposta=' +
      this.state.dataResposta +
      '&' +
      'informacaoAdicional=' +
      this.state.informacaoAdicional +
      '&' +
      'questionarioId=' +
      this.state.questionarioId +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { dataResposta, informacaoAdicional, questionarioId, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(dataResposta, informacaoAdicional, questionarioId, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { respostasQuestionariosList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Respostas Questionarios</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Respostas Questionarios</span>
              <Button id="togglerFilterRespostasQuestionarios" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link
                to={`${match.url}/new?${this.getFiltersURL()}`}
                className="btn btn-primary float-right jh-create-entity"
                id="jh-create-entity"
              >
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.respostasQuestionarios.home.createLabel">
                  Create a new Respostas Questionarios
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterRespostasQuestionarios">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'dataResposta' ? (
                        <Col md="3">
                          <Row>
                            <Label id="dataRespostaLabel" for="respostas-questionarios-dataResposta">
                              <Translate contentKey="generadorApp.respostasQuestionarios.dataResposta">Data Resposta</Translate>
                            </Label>
                            <AvInput
                              id="respostas-questionarios-dataResposta"
                              type="datetime-local"
                              className="form-control"
                              name="dataResposta"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.dataResposta ? convertDateTimeFromServer(this.state.dataResposta) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'informacaoAdicional' ? (
                        <Col md="3">
                          <Row>
                            <Label id="informacaoAdicionalLabel" for="respostas-questionarios-informacaoAdicional">
                              <Translate contentKey="generadorApp.respostasQuestionarios.informacaoAdicional">
                                Informacao Adicional
                              </Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="informacaoAdicional"
                              id="respostas-questionarios-informacaoAdicional"
                              value={this.state.informacaoAdicional}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'questionarioId' ? (
                        <Col md="3">
                          <Row>
                            <Label id="questionarioIdLabel" for="respostas-questionarios-questionarioId">
                              <Translate contentKey="generadorApp.respostasQuestionarios.questionarioId">Questionario Id</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="questionarioId"
                              id="respostas-questionarios-questionarioId"
                              value={this.state.questionarioId}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="entity.validation.filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="entity.validation.clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {respostasQuestionariosList && respostasQuestionariosList.length > 0 ? (
                <Table responsive aria-describedby="respostas-questionarios-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'dataResposta' ? (
                        <th className="hand" onClick={this.sort('dataResposta')}>
                          <Translate contentKey="generadorApp.respostasQuestionarios.dataResposta">Data Resposta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'informacaoAdicional' ? (
                        <th className="hand" onClick={this.sort('informacaoAdicional')}>
                          <Translate contentKey="generadorApp.respostasQuestionarios.informacaoAdicional">Informacao Adicional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'questionarioId' ? (
                        <th className="hand" onClick={this.sort('questionarioId')}>
                          <Translate contentKey="generadorApp.respostasQuestionarios.questionarioId">Questionario Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {respostasQuestionariosList.map((respostasQuestionarios, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${respostasQuestionarios.id}`} color="link" size="sm">
                            {respostasQuestionarios.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'dataResposta' ? (
                          <td>
                            <TextFormat type="date" value={respostasQuestionarios.dataResposta} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'informacaoAdicional' ? <td>{respostasQuestionarios.informacaoAdicional}</td> : null}

                        {this.state.baseFilters !== 'questionarioId' ? <td>{respostasQuestionarios.questionarioId}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${respostasQuestionarios.id}?${this.getFiltersURL()}`}
                              color="info"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${respostasQuestionarios.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${respostasQuestionarios.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.respostasQuestionarios.home.notFound">No Respostas Questionarios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={respostasQuestionariosList && respostasQuestionariosList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ respostasQuestionarios, ...storeState }: IRootState) => ({
  respostasQuestionariosList: respostasQuestionarios.entities,
  totalItems: respostasQuestionarios.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RespostasQuestionarios);
