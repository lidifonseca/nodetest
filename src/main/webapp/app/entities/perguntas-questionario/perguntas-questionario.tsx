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
import { Translate, translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getPerguntasQuestionarioState, IPerguntasQuestionarioBaseState, getEntities } from './perguntas-questionario.reducer';
import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPerguntasQuestionarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPerguntasQuestionarioState extends IPerguntasQuestionarioBaseState, IPaginationBaseState {}

export class PerguntasQuestionario extends React.Component<IPerguntasQuestionarioProps, IPerguntasQuestionarioState> {
  private myFormRef: any;

  constructor(props: IPerguntasQuestionarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPerguntasQuestionarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        pergunta: '',
        tipoResposta: '',
        obrigatorio: '',
        tipoCampo: ''
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
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { pergunta, tipoResposta, obrigatorio, tipoCampo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(pergunta, tipoResposta, obrigatorio, tipoCampo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { perguntasQuestionarioList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Perguntas Questionarios</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Perguntas Questionarios</span>
              <Button id="togglerFilterPerguntasQuestionario" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.perguntasQuestionario.home.createLabel">Create a new Perguntas Questionario</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPerguntasQuestionario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'pergunta' ? (
                        <Col md="3">
                          <Row>
                            <Label id="perguntaLabel" for="perguntas-questionario-pergunta">
                              <Translate contentKey="generadorApp.perguntasQuestionario.pergunta">Pergunta</Translate>
                            </Label>

                            <AvInput type="text" name="pergunta" id="perguntas-questionario-pergunta" value={this.state.pergunta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipoResposta' ? (
                        <Col md="3">
                          <Row>
                            <Label id="tipoRespostaLabel" for="perguntas-questionario-tipoResposta">
                              <Translate contentKey="generadorApp.perguntasQuestionario.tipoResposta">Tipo Resposta</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="tipoResposta"
                              id="perguntas-questionario-tipoResposta"
                              value={this.state.tipoResposta}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'obrigatorio' ? (
                        <Col md="3">
                          <Row>
                            <Label id="obrigatorioLabel" check>
                              <AvInput
                                id="perguntas-questionario-obrigatorio"
                                type="checkbox"
                                className="form-control"
                                name="obrigatorio"
                              />
                              <Translate contentKey="generadorApp.perguntasQuestionario.obrigatorio">Obrigatorio</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipoCampo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="tipoCampoLabel" for="perguntas-questionario-tipoCampo">
                              <Translate contentKey="generadorApp.perguntasQuestionario.tipoCampo">Tipo Campo</Translate>
                            </Label>

                            <AvInput type="text" name="tipoCampo" id="perguntas-questionario-tipoCampo" value={this.state.tipoCampo} />
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

              {perguntasQuestionarioList && perguntasQuestionarioList.length > 0 ? (
                <Table responsive aria-describedby="perguntas-questionario-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'pergunta' ? (
                        <th className="hand" onClick={this.sort('pergunta')}>
                          <Translate contentKey="generadorApp.perguntasQuestionario.pergunta">Pergunta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tipoResposta' ? (
                        <th className="hand" onClick={this.sort('tipoResposta')}>
                          <Translate contentKey="generadorApp.perguntasQuestionario.tipoResposta">Tipo Resposta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'obrigatorio' ? (
                        <th className="hand" onClick={this.sort('obrigatorio')}>
                          <Translate contentKey="generadorApp.perguntasQuestionario.obrigatorio">Obrigatorio</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tipoCampo' ? (
                        <th className="hand" onClick={this.sort('tipoCampo')}>
                          <Translate contentKey="generadorApp.perguntasQuestionario.tipoCampo">Tipo Campo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {perguntasQuestionarioList.map((perguntasQuestionario, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${perguntasQuestionario.id}`} color="link" size="sm">
                            {perguntasQuestionario.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'pergunta' ? <td>{perguntasQuestionario.pergunta}</td> : null}

                        {this.state.baseFilters !== 'tipoResposta' ? <td>{perguntasQuestionario.tipoResposta}</td> : null}

                        {this.state.baseFilters !== 'obrigatorio' ? <td>{perguntasQuestionario.obrigatorio ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'tipoCampo' ? <td>{perguntasQuestionario.tipoCampo}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${perguntasQuestionario.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${perguntasQuestionario.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${perguntasQuestionario.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.perguntasQuestionario.home.notFound">No Perguntas Questionarios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={perguntasQuestionarioList && perguntasQuestionarioList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ perguntasQuestionario, ...storeState }: IRootState) => ({
  perguntasQuestionarioList: perguntasQuestionario.entities,
  totalItems: perguntasQuestionario.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PerguntasQuestionario);
