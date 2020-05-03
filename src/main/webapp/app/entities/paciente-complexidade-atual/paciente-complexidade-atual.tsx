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
import { getEntities } from './paciente-complexidade-atual.reducer';
import { IPacienteComplexidadeAtual } from 'app/shared/model/paciente-complexidade-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteComplexidadeAtualProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteComplexidadeAtualBaseState {
  idPaciente: any;
  idPacienteComplexidade: any;
  baixa: any;
  media: any;
  alta: any;
  ventilacaoMecanica: any;
  telemonitoramente: any;
  idUsuario: any;
}
export interface IPacienteComplexidadeAtualState extends IPacienteComplexidadeAtualBaseState, IPaginationBaseState {}

export class PacienteComplexidadeAtual extends React.Component<IPacienteComplexidadeAtualProps, IPacienteComplexidadeAtualState> {
  private myFormRef: any;

  constructor(props: IPacienteComplexidadeAtualProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPacienteComplexidadeAtualState(this.props.location)
    };
  }

  getPacienteComplexidadeAtualState = (location): IPacienteComplexidadeAtualBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idPaciente = url.searchParams.get('idPaciente') || '';
    const idPacienteComplexidade = url.searchParams.get('idPacienteComplexidade') || '';
    const baixa = url.searchParams.get('baixa') || '';
    const media = url.searchParams.get('media') || '';
    const alta = url.searchParams.get('alta') || '';
    const ventilacaoMecanica = url.searchParams.get('ventilacaoMecanica') || '';
    const telemonitoramente = url.searchParams.get('telemonitoramente') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';

    return {
      idPaciente,
      idPacienteComplexidade,
      baixa,
      media,
      alta,
      ventilacaoMecanica,
      telemonitoramente,
      idUsuario
    };
  };

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
        telemonitoramente: '',
        idUsuario: ''
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
      'idUsuario=' +
      this.state.idUsuario +
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
      idUsuario,
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
      idUsuario,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pacienteComplexidadeAtualList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Complexidade Atuals</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Complexidade Atuals</span>
              <Button id="togglerFilterPacienteComplexidadeAtual" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pacienteComplexidadeAtual.home.createLabel">
                  Create a new Paciente Complexidade Atual
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteComplexidadeAtual">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="baixaLabel" for="paciente-complexidade-atual-baixa">
                            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.baixa">Baixa</Translate>
                          </Label>
                          <AvInput type="string" name="baixa" id="paciente-complexidade-atual-baixa" value={this.state.baixa} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="mediaLabel" for="paciente-complexidade-atual-media">
                            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.media">Media</Translate>
                          </Label>
                          <AvInput type="string" name="media" id="paciente-complexidade-atual-media" value={this.state.media} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="altaLabel" for="paciente-complexidade-atual-alta">
                            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.alta">Alta</Translate>
                          </Label>
                          <AvInput type="string" name="alta" id="paciente-complexidade-atual-alta" value={this.state.alta} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioLabel" for="paciente-complexidade-atual-idUsuario">
                            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.idUsuario">Id Usuario</Translate>
                          </Label>
                          <AvInput type="string" name="idUsuario" id="paciente-complexidade-atual-idUsuario" value={this.state.idUsuario} />
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

              {pacienteComplexidadeAtualList && pacienteComplexidadeAtualList.length > 0 ? (
                <Table responsive aria-describedby="paciente-complexidade-atual-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPaciente')}>
                        <Translate contentKey="generadorApp.pacienteComplexidadeAtual.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPacienteComplexidade')}>
                        <Translate contentKey="generadorApp.pacienteComplexidadeAtual.idPacienteComplexidade">
                          Id Paciente Complexidade
                        </Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('baixa')}>
                        <Translate contentKey="generadorApp.pacienteComplexidadeAtual.baixa">Baixa</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('media')}>
                        <Translate contentKey="generadorApp.pacienteComplexidadeAtual.media">Media</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('alta')}>
                        <Translate contentKey="generadorApp.pacienteComplexidadeAtual.alta">Alta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ventilacaoMecanica')}>
                        <Translate contentKey="generadorApp.pacienteComplexidadeAtual.ventilacaoMecanica">Ventilacao Mecanica</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telemonitoramente')}>
                        <Translate contentKey="generadorApp.pacienteComplexidadeAtual.telemonitoramente">Telemonitoramente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.pacienteComplexidadeAtual.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{pacienteComplexidadeAtual.idPaciente}</td>

                        <td>{pacienteComplexidadeAtual.idPacienteComplexidade}</td>

                        <td>{pacienteComplexidadeAtual.baixa}</td>

                        <td>{pacienteComplexidadeAtual.media}</td>

                        <td>{pacienteComplexidadeAtual.alta}</td>

                        <td>{pacienteComplexidadeAtual.ventilacaoMecanica}</td>

                        <td>{pacienteComplexidadeAtual.telemonitoramente}</td>

                        <td>{pacienteComplexidadeAtual.idUsuario}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacienteComplexidadeAtual.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteComplexidadeAtual.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteComplexidadeAtual.id}/delete`} color="danger" size="sm">
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
