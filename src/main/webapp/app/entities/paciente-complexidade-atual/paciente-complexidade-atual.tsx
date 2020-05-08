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
import { getPacienteComplexidadeAtualState, IPacienteComplexidadeAtualBaseState, getEntities } from './paciente-complexidade-atual.reducer';
import { IPacienteComplexidadeAtual } from 'app/shared/model/paciente-complexidade-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteComplexidadeAtualProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteComplexidadeAtualState extends IPacienteComplexidadeAtualBaseState, IPaginationBaseState {}

export class PacienteComplexidadeAtual extends React.Component<IPacienteComplexidadeAtualProps, IPacienteComplexidadeAtualState> {
  private myFormRef: any;

  constructor(props: IPacienteComplexidadeAtualProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacienteComplexidadeAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPaciente: '',
        idPacienteComplexidade: '',
        baixa: '',
        media: '',
        alta: '',
        ventilacaoMecanica: '',
        telemonitoramente: ''
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
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idPacienteComplexidade=' +
      this.state.idPacienteComplexidade +
      '&' +
      'baixa=' +
      this.state.baixa +
      '&' +
      'media=' +
      this.state.media +
      '&' +
      'alta=' +
      this.state.alta +
      '&' +
      'ventilacaoMecanica=' +
      this.state.ventilacaoMecanica +
      '&' +
      'telemonitoramente=' +
      this.state.telemonitoramente +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idPaciente,
      idPacienteComplexidade,
      baixa,
      media,
      alta,
      ventilacaoMecanica,
      telemonitoramente,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idPaciente,
      idPacienteComplexidade,
      baixa,
      media,
      alta,
      ventilacaoMecanica,
      telemonitoramente,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pacienteComplexidadeAtualList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Paciente Complexidade Atuals</span>
          <Button id="togglerFilterPacienteComplexidadeAtual" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.home.createLabel">
              Create a new Paciente Complexidade Atual
            </Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Complexidade Atuals</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteComplexidadeAtual">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPacienteLabel" for="paciente-complexidade-atual-idPaciente">
                              <Translate contentKey="generadorApp.pacienteComplexidadeAtual.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idPaciente"
                              id="paciente-complexidade-atual-idPaciente"
                              value={this.state.idPaciente}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPacienteComplexidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPacienteComplexidadeLabel" for="paciente-complexidade-atual-idPacienteComplexidade">
                              <Translate contentKey="generadorApp.pacienteComplexidadeAtual.idPacienteComplexidade">
                                Id Paciente Complexidade
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idPacienteComplexidade"
                              id="paciente-complexidade-atual-idPacienteComplexidade"
                              value={this.state.idPacienteComplexidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'baixa' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="baixaLabel" for="paciente-complexidade-atual-baixa">
                              <Translate contentKey="generadorApp.pacienteComplexidadeAtual.baixa">Baixa</Translate>
                            </Label>
                            <AvInput type="string" name="baixa" id="paciente-complexidade-atual-baixa" value={this.state.baixa} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'media' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="mediaLabel" for="paciente-complexidade-atual-media">
                              <Translate contentKey="generadorApp.pacienteComplexidadeAtual.media">Media</Translate>
                            </Label>
                            <AvInput type="string" name="media" id="paciente-complexidade-atual-media" value={this.state.media} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'alta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="altaLabel" for="paciente-complexidade-atual-alta">
                              <Translate contentKey="generadorApp.pacienteComplexidadeAtual.alta">Alta</Translate>
                            </Label>
                            <AvInput type="string" name="alta" id="paciente-complexidade-atual-alta" value={this.state.alta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ventilacaoMecanica' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ventilacaoMecanicaLabel" for="paciente-complexidade-atual-ventilacaoMecanica">
                              <Translate contentKey="generadorApp.pacienteComplexidadeAtual.ventilacaoMecanica">
                                Ventilacao Mecanica
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ventilacaoMecanica"
                              id="paciente-complexidade-atual-ventilacaoMecanica"
                              value={this.state.ventilacaoMecanica}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telemonitoramente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="telemonitoramenteLabel" for="paciente-complexidade-atual-telemonitoramente">
                              <Translate contentKey="generadorApp.pacienteComplexidadeAtual.telemonitoramente">Telemonitoramente</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="telemonitoramente"
                              id="paciente-complexidade-atual-telemonitoramente"
                              value={this.state.telemonitoramente}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.pacienteComplexidadeAtual.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.pacienteComplexidadeAtual.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {pacienteComplexidadeAtualList && pacienteComplexidadeAtualList.length > 0 ? (
                <Table responsive aria-describedby="paciente-complexidade-atual-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <th className="hand" onClick={this.sort('idPaciente')}>
                          <Translate contentKey="generadorApp.pacienteComplexidadeAtual.idPaciente">Id Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPacienteComplexidade' ? (
                        <th className="hand" onClick={this.sort('idPacienteComplexidade')}>
                          <Translate contentKey="generadorApp.pacienteComplexidadeAtual.idPacienteComplexidade">
                            Id Paciente Complexidade
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'baixa' ? (
                        <th className="hand" onClick={this.sort('baixa')}>
                          <Translate contentKey="generadorApp.pacienteComplexidadeAtual.baixa">Baixa</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'media' ? (
                        <th className="hand" onClick={this.sort('media')}>
                          <Translate contentKey="generadorApp.pacienteComplexidadeAtual.media">Media</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'alta' ? (
                        <th className="hand" onClick={this.sort('alta')}>
                          <Translate contentKey="generadorApp.pacienteComplexidadeAtual.alta">Alta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ventilacaoMecanica' ? (
                        <th className="hand" onClick={this.sort('ventilacaoMecanica')}>
                          <Translate contentKey="generadorApp.pacienteComplexidadeAtual.ventilacaoMecanica">Ventilacao Mecanica</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telemonitoramente' ? (
                        <th className="hand" onClick={this.sort('telemonitoramente')}>
                          <Translate contentKey="generadorApp.pacienteComplexidadeAtual.telemonitoramente">Telemonitoramente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteComplexidadeAtualList.map((pacienteComplexidadeAtual, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacienteComplexidadeAtual.id}`} color="link" size="sm">
                            {pacienteComplexidadeAtual.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idPaciente' ? <td>{pacienteComplexidadeAtual.idPaciente}</td> : null}

                        {this.state.baseFilters !== 'idPacienteComplexidade' ? (
                          <td>{pacienteComplexidadeAtual.idPacienteComplexidade}</td>
                        ) : null}

                        {this.state.baseFilters !== 'baixa' ? <td>{pacienteComplexidadeAtual.baixa}</td> : null}

                        {this.state.baseFilters !== 'media' ? <td>{pacienteComplexidadeAtual.media}</td> : null}

                        {this.state.baseFilters !== 'alta' ? <td>{pacienteComplexidadeAtual.alta}</td> : null}

                        {this.state.baseFilters !== 'ventilacaoMecanica' ? <td>{pacienteComplexidadeAtual.ventilacaoMecanica}</td> : null}

                        {this.state.baseFilters !== 'telemonitoramente' ? <td>{pacienteComplexidadeAtual.telemonitoramente}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${pacienteComplexidadeAtual.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${pacienteComplexidadeAtual.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${pacienteComplexidadeAtual.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.pacienteComplexidadeAtual.home.notFound">
                    No Paciente Complexidade Atuals found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteComplexidadeAtualList && pacienteComplexidadeAtualList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacienteComplexidadeAtual, ...storeState }: IRootState) => ({
  pacienteComplexidadeAtualList: pacienteComplexidadeAtual.entities,
  totalItems: pacienteComplexidadeAtual.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteComplexidadeAtual);
