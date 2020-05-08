/* eslint complexity: ["error", 100] */
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
import { getAcoesRespostasState, IAcoesRespostasBaseState, getEntities } from './acoes-respostas.reducer';
import { IAcoesRespostas } from 'app/shared/model/acoes-respostas.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IAcoesRespostasProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAcoesRespostasState extends IAcoesRespostasBaseState, IPaginationBaseState {}

export class AcoesRespostas extends React.Component<IAcoesRespostasProps, IAcoesRespostasState> {
  private myFormRef: any;

  constructor(props: IAcoesRespostasProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getAcoesRespostasState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        abrirCampoPersonalizado: '',
        condicaoSexo: '',
        observacoes: '',
        tipoCampo1: '',
        tipoCampo2: ''
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
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { acoesRespostasList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Acoes Respostas</span>
          <Button id="togglerFilterAcoesRespostas" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.acoesRespostas.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.acoesRespostas.home.createLabel">Create a new Acoes Respostas</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Acoes Respostas</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAcoesRespostas">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'abrirCampoPersonalizado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'condicaoSexo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="condicaoSexoLabel" for="acoes-respostas-condicaoSexo">
                              <Translate contentKey="generadorApp.acoesRespostas.condicaoSexo">Condicao Sexo</Translate>
                            </Label>

                            <AvInput type="text" name="condicaoSexo" id="acoes-respostas-condicaoSexo" value={this.state.condicaoSexo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'observacoes' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="observacoesLabel" for="acoes-respostas-observacoes">
                              <Translate contentKey="generadorApp.acoesRespostas.observacoes">Observacoes</Translate>
                            </Label>

                            <AvInput type="text" name="observacoes" id="acoes-respostas-observacoes" value={this.state.observacoes} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipoCampo1' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="tipoCampo1Label" for="acoes-respostas-tipoCampo1">
                              <Translate contentKey="generadorApp.acoesRespostas.tipoCampo1">Tipo Campo 1</Translate>
                            </Label>

                            <AvInput type="text" name="tipoCampo1" id="acoes-respostas-tipoCampo1" value={this.state.tipoCampo1} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipoCampo2' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="tipoCampo2Label" for="acoes-respostas-tipoCampo2">
                              <Translate contentKey="generadorApp.acoesRespostas.tipoCampo2">Tipo Campo 2</Translate>
                            </Label>

                            <AvInput type="text" name="tipoCampo2" id="acoes-respostas-tipoCampo2" value={this.state.tipoCampo2} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.acoesRespostas.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.acoesRespostas.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'abrirCampoPersonalizado' ? (
                        <th className="hand" onClick={this.sort('abrirCampoPersonalizado')}>
                          <Translate contentKey="generadorApp.acoesRespostas.abrirCampoPersonalizado">Abrir Campo Personalizado</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'condicaoSexo' ? (
                        <th className="hand" onClick={this.sort('condicaoSexo')}>
                          <Translate contentKey="generadorApp.acoesRespostas.condicaoSexo">Condicao Sexo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'observacoes' ? (
                        <th className="hand" onClick={this.sort('observacoes')}>
                          <Translate contentKey="generadorApp.acoesRespostas.observacoes">Observacoes</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tipoCampo1' ? (
                        <th className="hand" onClick={this.sort('tipoCampo1')}>
                          <Translate contentKey="generadorApp.acoesRespostas.tipoCampo1">Tipo Campo 1</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tipoCampo2' ? (
                        <th className="hand" onClick={this.sort('tipoCampo2')}>
                          <Translate contentKey="generadorApp.acoesRespostas.tipoCampo2">Tipo Campo 2</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'abrirCampoPersonalizado' ? (
                          <td>{acoesRespostas.abrirCampoPersonalizado ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'condicaoSexo' ? <td>{acoesRespostas.condicaoSexo}</td> : null}

                        {this.state.baseFilters !== 'observacoes' ? <td>{acoesRespostas.observacoes}</td> : null}

                        {this.state.baseFilters !== 'tipoCampo1' ? <td>{acoesRespostas.tipoCampo1}</td> : null}

                        {this.state.baseFilters !== 'tipoCampo2' ? <td>{acoesRespostas.tipoCampo2}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${acoesRespostas.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${acoesRespostas.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${acoesRespostas.id}/delete?${this.getFiltersURL()}`}
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
  acoesRespostasList: acoesRespostas.entities,
  totalItems: acoesRespostas.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AcoesRespostas);
