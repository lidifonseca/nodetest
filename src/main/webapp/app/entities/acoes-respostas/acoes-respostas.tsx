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
import { getEntities } from './acoes-respostas.reducer';
import { IAcoesRespostas } from 'app/shared/model/acoes-respostas.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IRespostas } from 'app/shared/model/respostas.model';
import { getEntities as getRespostas } from 'app/entities/respostas/respostas.reducer';
import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';
import { getEntities as getPerguntasQuestionarios } from 'app/entities/perguntas-questionario/perguntas-questionario.reducer';

export interface IAcoesRespostasProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAcoesRespostasBaseState {
  abrirCampoPersonalizado: any;
  condicaoSexo: any;
  observacoes: any;
  tipoCampo1: any;
  tipoCampo2: any;
  respostasId: any;
  perguntasQuestionarioId: any;
}
export interface IAcoesRespostasState extends IAcoesRespostasBaseState, IPaginationBaseState {}

export class AcoesRespostas extends React.Component<IAcoesRespostasProps, IAcoesRespostasState> {
  private myFormRef: any;

  constructor(props: IAcoesRespostasProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getAcoesRespostasState(this.props.location)
    };
  }

  getAcoesRespostasState = (location): IAcoesRespostasBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const abrirCampoPersonalizado = url.searchParams.get('abrirCampoPersonalizado') || '';
    const condicaoSexo = url.searchParams.get('condicaoSexo') || '';
    const observacoes = url.searchParams.get('observacoes') || '';
    const tipoCampo1 = url.searchParams.get('tipoCampo1') || '';
    const tipoCampo2 = url.searchParams.get('tipoCampo2') || '';

    const respostasId = url.searchParams.get('respostasId') || '';
    const perguntasQuestionarioId = url.searchParams.get('perguntasQuestionarioId') || '';

    return {
      abrirCampoPersonalizado,
      condicaoSexo,
      observacoes,
      tipoCampo1,
      tipoCampo2,
      respostasId,
      perguntasQuestionarioId
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getRespostas();
    this.props.getPerguntasQuestionarios();
  }

  cancelCourse = () => {
    this.setState(
      {
        abrirCampoPersonalizado: '',
        condicaoSexo: '',
        observacoes: '',
        tipoCampo1: '',
        tipoCampo2: '',
        respostasId: '',
        perguntasQuestionarioId: ''
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
      'abrirCampoPersonalizado=' +
      this.state.abrirCampoPersonalizado +
      '&' +
      'condicaoSexo=' +
      this.state.condicaoSexo +
      '&' +
      'observacoes=' +
      this.state.observacoes +
      '&' +
      'tipoCampo1=' +
      this.state.tipoCampo1 +
      '&' +
      'tipoCampo2=' +
      this.state.tipoCampo2 +
      '&' +
      'respostasId=' +
      this.state.respostasId +
      '&' +
      'perguntasQuestionarioId=' +
      this.state.perguntasQuestionarioId +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      abrirCampoPersonalizado,
      condicaoSexo,
      observacoes,
      tipoCampo1,
      tipoCampo2,
      respostasId,
      perguntasQuestionarioId,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      abrirCampoPersonalizado,
      condicaoSexo,
      observacoes,
      tipoCampo1,
      tipoCampo2,
      respostasId,
      perguntasQuestionarioId,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { respostas, perguntasQuestionarios, acoesRespostasList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Acoes Respostas</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Acoes Respostas</span>
              <Button id="togglerFilterAcoesRespostas" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.acoesRespostas.home.createLabel">Create a new Acoes Respostas</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAcoesRespostas">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="abrirCampoPersonalizadoLabel" check>
                            <AvInput
                              id="acoes-respostas-abrirCampoPersonalizado"
                              type="checkbox"
                              className="form-control"
                              name="abrirCampoPersonalizado"
                            />
                            <Translate contentKey="generadorApp.acoesRespostas.abrirCampoPersonalizado">
                              Abrir Campo Personalizado
                            </Translate>
                          </Label>
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="condicaoSexoLabel" for="acoes-respostas-condicaoSexo">
                            <Translate contentKey="generadorApp.acoesRespostas.condicaoSexo">Condicao Sexo</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="condicaoSexo"
                            id="acoes-respostas-condicaoSexo"
                            value={this.state.condicaoSexo}
                            validate={{
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="observacoesLabel" for="acoes-respostas-observacoes">
                            <Translate contentKey="generadorApp.acoesRespostas.observacoes">Observacoes</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="observacoes"
                            id="acoes-respostas-observacoes"
                            value={this.state.observacoes}
                            validate={{
                              maxLength: { value: 125, errorMessage: translate('entity.validation.maxlength', { max: 125 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tipoCampo1Label" for="acoes-respostas-tipoCampo1">
                            <Translate contentKey="generadorApp.acoesRespostas.tipoCampo1">Tipo Campo 1</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="tipoCampo1"
                            id="acoes-respostas-tipoCampo1"
                            value={this.state.tipoCampo1}
                            validate={{
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tipoCampo2Label" for="acoes-respostas-tipoCampo2">
                            <Translate contentKey="generadorApp.acoesRespostas.tipoCampo2">Tipo Campo 2</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="tipoCampo2"
                            id="acoes-respostas-tipoCampo2"
                            value={this.state.tipoCampo2}
                            validate={{
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="acoes-respostas-respostasId">
                              <Translate contentKey="generadorApp.acoesRespostas.respostasId">Respostas Id</Translate>
                            </Label>
                            <AvInput id="acoes-respostas-respostasId" type="select" className="form-control" name="respostasIdId">
                              <option value="" key="0" />
                              {respostas
                                ? respostas.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="acoes-respostas-perguntasQuestionarioId">
                              <Translate contentKey="generadorApp.acoesRespostas.perguntasQuestionarioId">
                                Perguntas Questionario Id
                              </Translate>
                            </Label>
                            <AvInput
                              id="acoes-respostas-perguntasQuestionarioId"
                              type="select"
                              className="form-control"
                              name="perguntasQuestionarioIdId"
                            >
                              <option value="" key="0" />
                              {perguntasQuestionarios
                                ? perguntasQuestionarios.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
                        </Row>
                      </Col>
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

              {acoesRespostasList && acoesRespostasList.length > 0 ? (
                <Table responsive aria-describedby="acoes-respostas-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('abrirCampoPersonalizado')}>
                        <Translate contentKey="generadorApp.acoesRespostas.abrirCampoPersonalizado">Abrir Campo Personalizado</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('condicaoSexo')}>
                        <Translate contentKey="generadorApp.acoesRespostas.condicaoSexo">Condicao Sexo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('observacoes')}>
                        <Translate contentKey="generadorApp.acoesRespostas.observacoes">Observacoes</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tipoCampo1')}>
                        <Translate contentKey="generadorApp.acoesRespostas.tipoCampo1">Tipo Campo 1</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tipoCampo2')}>
                        <Translate contentKey="generadorApp.acoesRespostas.tipoCampo2">Tipo Campo 2</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.acoesRespostas.respostasId">Respostas Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.acoesRespostas.perguntasQuestionarioId">Perguntas Questionario Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {acoesRespostasList.map((acoesRespostas, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${acoesRespostas.id}`} color="link" size="sm">
                            {acoesRespostas.id}
                          </Button>
                        </td>

                        <td>{acoesRespostas.abrirCampoPersonalizado ? 'true' : 'false'}</td>

                        <td>{acoesRespostas.condicaoSexo}</td>

                        <td>{acoesRespostas.observacoes}</td>

                        <td>{acoesRespostas.tipoCampo1}</td>

                        <td>{acoesRespostas.tipoCampo2}</td>
                        <td>
                          {acoesRespostas.respostasId ? (
                            <Link to={`respostas/${acoesRespostas.respostasId.id}`}>{acoesRespostas.respostasId.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {acoesRespostas.perguntasQuestionarioId ? (
                            <Link to={`perguntas-questionario/${acoesRespostas.perguntasQuestionarioId.id}`}>
                              {acoesRespostas.perguntasQuestionarioId.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${acoesRespostas.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${acoesRespostas.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${acoesRespostas.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.acoesRespostas.home.notFound">No Acoes Respostas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={acoesRespostasList && acoesRespostasList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ acoesRespostas, ...storeState }: IRootState) => ({
  respostas: storeState.respostas.entities,
  perguntasQuestionarios: storeState.perguntasQuestionario.entities,
  acoesRespostasList: acoesRespostas.entities,
  totalItems: acoesRespostas.totalItems
});

const mapDispatchToProps = {
  getRespostas,
  getPerguntasQuestionarios,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AcoesRespostas);
