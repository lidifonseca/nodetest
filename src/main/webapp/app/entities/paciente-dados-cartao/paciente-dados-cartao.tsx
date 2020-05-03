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
import { getEntities } from './paciente-dados-cartao.reducer';
import { IPacienteDadosCartao } from 'app/shared/model/paciente-dados-cartao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';

export interface IPacienteDadosCartaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteDadosCartaoBaseState {
  bandeira: any;
  numeroCartao: any;
  validade: any;
  codAtivacao: any;
  ativo: any;
  dataPost: any;
  pacientePedido: any;
  idPaciente: any;
}
export interface IPacienteDadosCartaoState extends IPacienteDadosCartaoBaseState, IPaginationBaseState {}

export class PacienteDadosCartao extends React.Component<IPacienteDadosCartaoProps, IPacienteDadosCartaoState> {
  private myFormRef: any;

  constructor(props: IPacienteDadosCartaoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPacienteDadosCartaoState(this.props.location)
    };
  }

  getPacienteDadosCartaoState = (location): IPacienteDadosCartaoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const bandeira = url.searchParams.get('bandeira') || '';
    const numeroCartao = url.searchParams.get('numeroCartao') || '';
    const validade = url.searchParams.get('validade') || '';
    const codAtivacao = url.searchParams.get('codAtivacao') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    const pacientePedido = url.searchParams.get('pacientePedido') || '';
    const idPaciente = url.searchParams.get('idPaciente') || '';

    return {
      bandeira,
      numeroCartao,
      validade,
      codAtivacao,
      ativo,
      dataPost,
      pacientePedido,
      idPaciente
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getPacientes();
  }

  cancelCourse = () => {
    this.setState(
      {
        bandeira: '',
        numeroCartao: '',
        validade: '',
        codAtivacao: '',
        ativo: '',
        dataPost: '',
        pacientePedido: '',
        idPaciente: ''
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
      'bandeira=' +
      this.state.bandeira +
      '&' +
      'numeroCartao=' +
      this.state.numeroCartao +
      '&' +
      'validade=' +
      this.state.validade +
      '&' +
      'codAtivacao=' +
      this.state.codAtivacao +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'pacientePedido=' +
      this.state.pacientePedido +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      bandeira,
      numeroCartao,
      validade,
      codAtivacao,
      ativo,
      dataPost,
      pacientePedido,
      idPaciente,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      bandeira,
      numeroCartao,
      validade,
      codAtivacao,
      ativo,
      dataPost,
      pacientePedido,
      idPaciente,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pacientes, pacienteDadosCartaoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Dados Cartaos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Dados Cartaos</span>
              <Button id="togglerFilterPacienteDadosCartao" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pacienteDadosCartao.home.createLabel">Create a new Paciente Dados Cartao</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteDadosCartao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="bandeiraLabel" for="paciente-dados-cartao-bandeira">
                            <Translate contentKey="generadorApp.pacienteDadosCartao.bandeira">Bandeira</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="bandeira"
                            id="paciente-dados-cartao-bandeira"
                            value={this.state.bandeira}
                            validate={{
                              maxLength: { value: 40, errorMessage: translate('entity.validation.maxlength', { max: 40 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="numeroCartaoLabel" for="paciente-dados-cartao-numeroCartao">
                            <Translate contentKey="generadorApp.pacienteDadosCartao.numeroCartao">Numero Cartao</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="numeroCartao"
                            id="paciente-dados-cartao-numeroCartao"
                            value={this.state.numeroCartao}
                            validate={{
                              maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="validadeLabel" for="paciente-dados-cartao-validade">
                            <Translate contentKey="generadorApp.pacienteDadosCartao.validade">Validade</Translate>
                          </Label>
                          <AvInput type="date" name="validade" id="paciente-dados-cartao-validade" value={this.state.validade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="codAtivacaoLabel" for="paciente-dados-cartao-codAtivacao">
                            <Translate contentKey="generadorApp.pacienteDadosCartao.codAtivacao">Cod Ativacao</Translate>
                          </Label>
                          <AvInput type="string" name="codAtivacao" id="paciente-dados-cartao-codAtivacao" value={this.state.codAtivacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="paciente-dados-cartao-ativo">
                            <Translate contentKey="generadorApp.pacienteDadosCartao.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="paciente-dados-cartao-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="paciente-dados-cartao-dataPost">
                            <Translate contentKey="generadorApp.pacienteDadosCartao.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="paciente-dados-cartao-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="paciente-dados-cartao-idPaciente">
                              <Translate contentKey="generadorApp.pacienteDadosCartao.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput id="paciente-dados-cartao-idPaciente" type="select" className="form-control" name="idPacienteId">
                              <option value="" key="0" />
                              {pacientes
                                ? pacientes.map(otherEntity => (
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

              {pacienteDadosCartaoList && pacienteDadosCartaoList.length > 0 ? (
                <Table responsive aria-describedby="paciente-dados-cartao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('bandeira')}>
                        <Translate contentKey="generadorApp.pacienteDadosCartao.bandeira">Bandeira</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('numeroCartao')}>
                        <Translate contentKey="generadorApp.pacienteDadosCartao.numeroCartao">Numero Cartao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('validade')}>
                        <Translate contentKey="generadorApp.pacienteDadosCartao.validade">Validade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('codAtivacao')}>
                        <Translate contentKey="generadorApp.pacienteDadosCartao.codAtivacao">Cod Ativacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.pacienteDadosCartao.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.pacienteDadosCartao.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacienteDadosCartao.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteDadosCartaoList.map((pacienteDadosCartao, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacienteDadosCartao.id}`} color="link" size="sm">
                            {pacienteDadosCartao.id}
                          </Button>
                        </td>

                        <td>{pacienteDadosCartao.bandeira}</td>

                        <td>{pacienteDadosCartao.numeroCartao}</td>

                        <td>
                          <TextFormat type="date" value={pacienteDadosCartao.validade} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>{pacienteDadosCartao.codAtivacao}</td>

                        <td>{pacienteDadosCartao.ativo}</td>

                        <td>
                          <TextFormat type="date" value={pacienteDadosCartao.dataPost} format={APP_DATE_FORMAT} />
                        </td>
                        <td>
                          {pacienteDadosCartao.idPaciente ? (
                            <Link to={`paciente/${pacienteDadosCartao.idPaciente.id}`}>{pacienteDadosCartao.idPaciente.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacienteDadosCartao.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteDadosCartao.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteDadosCartao.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.pacienteDadosCartao.home.notFound">No Paciente Dados Cartaos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteDadosCartaoList && pacienteDadosCartaoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacienteDadosCartao, ...storeState }: IRootState) => ({
  pacientes: storeState.paciente.entities,
  pacienteDadosCartaoList: pacienteDadosCartao.entities,
  totalItems: pacienteDadosCartao.totalItems
});

const mapDispatchToProps = {
  getPacientes,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDadosCartao);
