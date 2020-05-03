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
import { getEntities } from './pad.reducer';
import { IPad } from 'app/shared/model/pad.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';

export interface IPadProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadBaseState {
  idUnidade: any;
  idOperadora: any;
  idFranquia: any;
  nroPad: any;
  dataInicio: any;
  dataFim: any;
  dataConferido: any;
  ativo: any;
  dataPost: any;
  idUsuario: any;
  statusPad: any;
  novoModelo: any;
  imagePath: any;
  score: any;
  padCid: any;
  padItem: any;
  idPaciente: any;
}
export interface IPadState extends IPadBaseState, IPaginationBaseState {}

export class Pad extends React.Component<IPadProps, IPadState> {
  private myFormRef: any;

  constructor(props: IPadProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPadState(this.props.location)
    };
  }

  getPadState = (location): IPadBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idUnidade = url.searchParams.get('idUnidade') || '';
    const idOperadora = url.searchParams.get('idOperadora') || '';
    const idFranquia = url.searchParams.get('idFranquia') || '';
    const nroPad = url.searchParams.get('nroPad') || '';
    const dataInicio = url.searchParams.get('dataInicio') || '';
    const dataFim = url.searchParams.get('dataFim') || '';
    const dataConferido = url.searchParams.get('dataConferido') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPost = url.searchParams.get('dataPost') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';
    const statusPad = url.searchParams.get('statusPad') || '';
    const novoModelo = url.searchParams.get('novoModelo') || '';
    const imagePath = url.searchParams.get('imagePath') || '';
    const score = url.searchParams.get('score') || '';

    const padCid = url.searchParams.get('padCid') || '';
    const padItem = url.searchParams.get('padItem') || '';
    const idPaciente = url.searchParams.get('idPaciente') || '';

    return {
      idUnidade,
      idOperadora,
      idFranquia,
      nroPad,
      dataInicio,
      dataFim,
      dataConferido,
      ativo,
      dataPost,
      idUsuario,
      statusPad,
      novoModelo,
      imagePath,
      score,
      padCid,
      padItem,
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
        idUnidade: '',
        idOperadora: '',
        idFranquia: '',
        nroPad: '',
        dataInicio: '',
        dataFim: '',
        dataConferido: '',
        ativo: '',
        dataPost: '',
        idUsuario: '',
        statusPad: '',
        novoModelo: '',
        imagePath: '',
        score: '',
        padCid: '',
        padItem: '',
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
      'idUnidade=' +
      this.state.idUnidade +
      '&' +
      'idOperadora=' +
      this.state.idOperadora +
      '&' +
      'idFranquia=' +
      this.state.idFranquia +
      '&' +
      'nroPad=' +
      this.state.nroPad +
      '&' +
      'dataInicio=' +
      this.state.dataInicio +
      '&' +
      'dataFim=' +
      this.state.dataFim +
      '&' +
      'dataConferido=' +
      this.state.dataConferido +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      'statusPad=' +
      this.state.statusPad +
      '&' +
      'novoModelo=' +
      this.state.novoModelo +
      '&' +
      'imagePath=' +
      this.state.imagePath +
      '&' +
      'score=' +
      this.state.score +
      '&' +
      'padCid=' +
      this.state.padCid +
      '&' +
      'padItem=' +
      this.state.padItem +
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
      idUnidade,
      idOperadora,
      idFranquia,
      nroPad,
      dataInicio,
      dataFim,
      dataConferido,
      ativo,
      dataPost,
      idUsuario,
      statusPad,
      novoModelo,
      imagePath,
      score,
      padCid,
      padItem,
      idPaciente,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idUnidade,
      idOperadora,
      idFranquia,
      nroPad,
      dataInicio,
      dataFim,
      dataConferido,
      ativo,
      dataPost,
      idUsuario,
      statusPad,
      novoModelo,
      imagePath,
      score,
      padCid,
      padItem,
      idPaciente,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pacientes, padList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pads</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pads</span>
              <Button id="togglerFilterPad" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pad.home.createLabel">Create a new Pad</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPad">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idUnidadeLabel" for="pad-idUnidade">
                            <Translate contentKey="generadorApp.pad.idUnidade">Id Unidade</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="idUnidade"
                            id="pad-idUnidade"
                            value={this.state.idUnidade}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idOperadoraLabel" for="pad-idOperadora">
                            <Translate contentKey="generadorApp.pad.idOperadora">Id Operadora</Translate>
                          </Label>
                          <AvInput type="string" name="idOperadora" id="pad-idOperadora" value={this.state.idOperadora} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idFranquiaLabel" for="pad-idFranquia">
                            <Translate contentKey="generadorApp.pad.idFranquia">Id Franquia</Translate>
                          </Label>

                          <AvInput type="text" name="idFranquia" id="pad-idFranquia" value={this.state.idFranquia} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nroPadLabel" for="pad-nroPad">
                            <Translate contentKey="generadorApp.pad.nroPad">Nro Pad</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nroPad"
                            id="pad-nroPad"
                            value={this.state.nroPad}
                            validate={{
                              maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataInicioLabel" for="pad-dataInicio">
                            <Translate contentKey="generadorApp.pad.dataInicio">Data Inicio</Translate>
                          </Label>
                          <AvInput type="date" name="dataInicio" id="pad-dataInicio" value={this.state.dataInicio} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataFimLabel" for="pad-dataFim">
                            <Translate contentKey="generadorApp.pad.dataFim">Data Fim</Translate>
                          </Label>
                          <AvInput type="date" name="dataFim" id="pad-dataFim" value={this.state.dataFim} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataConferidoLabel" for="pad-dataConferido">
                            <Translate contentKey="generadorApp.pad.dataConferido">Data Conferido</Translate>
                          </Label>
                          <AvInput type="date" name="dataConferido" id="pad-dataConferido" value={this.state.dataConferido} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="pad-ativo">
                            <Translate contentKey="generadorApp.pad.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="pad-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="pad-dataPost">
                            <Translate contentKey="generadorApp.pad.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="pad-dataPost"
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
                        <Row>
                          <Label id="idUsuarioLabel" for="pad-idUsuario">
                            <Translate contentKey="generadorApp.pad.idUsuario">Id Usuario</Translate>
                          </Label>
                          <AvInput type="string" name="idUsuario" id="pad-idUsuario" value={this.state.idUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="statusPadLabel" for="pad-statusPad">
                            <Translate contentKey="generadorApp.pad.statusPad">Status Pad</Translate>
                          </Label>
                          <AvInput type="string" name="statusPad" id="pad-statusPad" value={this.state.statusPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="novoModeloLabel" check>
                            <AvInput id="pad-novoModelo" type="checkbox" className="form-control" name="novoModelo" />
                            <Translate contentKey="generadorApp.pad.novoModelo">Novo Modelo</Translate>
                          </Label>
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="imagePathLabel" for="pad-imagePath">
                            <Translate contentKey="generadorApp.pad.imagePath">Image Path</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="imagePath"
                            id="pad-imagePath"
                            value={this.state.imagePath}
                            validate={{
                              maxLength: { value: 250, errorMessage: translate('entity.validation.maxlength', { max: 250 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="scoreLabel" for="pad-score">
                            <Translate contentKey="generadorApp.pad.score">Score</Translate>
                          </Label>
                          <AvInput type="string" name="score" id="pad-score" value={this.state.score} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="pad-idPaciente">
                              <Translate contentKey="generadorApp.pad.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput id="pad-idPaciente" type="select" className="form-control" name="idPacienteId">
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

              {padList && padList.length > 0 ? (
                <Table responsive aria-describedby="pad-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUnidade')}>
                        <Translate contentKey="generadorApp.pad.idUnidade">Id Unidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idOperadora')}>
                        <Translate contentKey="generadorApp.pad.idOperadora">Id Operadora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idFranquia')}>
                        <Translate contentKey="generadorApp.pad.idFranquia">Id Franquia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nroPad')}>
                        <Translate contentKey="generadorApp.pad.nroPad">Nro Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataInicio')}>
                        <Translate contentKey="generadorApp.pad.dataInicio">Data Inicio</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataFim')}>
                        <Translate contentKey="generadorApp.pad.dataFim">Data Fim</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataConferido')}>
                        <Translate contentKey="generadorApp.pad.dataConferido">Data Conferido</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.pad.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.pad.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.pad.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('statusPad')}>
                        <Translate contentKey="generadorApp.pad.statusPad">Status Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('novoModelo')}>
                        <Translate contentKey="generadorApp.pad.novoModelo">Novo Modelo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('imagePath')}>
                        <Translate contentKey="generadorApp.pad.imagePath">Image Path</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('score')}>
                        <Translate contentKey="generadorApp.pad.score">Score</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pad.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padList.map((pad, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pad.id}`} color="link" size="sm">
                            {pad.id}
                          </Button>
                        </td>

                        <td>{pad.idUnidade}</td>

                        <td>{pad.idOperadora}</td>

                        <td>{pad.idFranquia}</td>

                        <td>{pad.nroPad}</td>

                        <td>
                          <TextFormat type="date" value={pad.dataInicio} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={pad.dataFim} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={pad.dataConferido} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>{pad.ativo}</td>

                        <td>
                          <TextFormat type="date" value={pad.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{pad.idUsuario}</td>

                        <td>{pad.statusPad}</td>

                        <td>{pad.novoModelo ? 'true' : 'false'}</td>

                        <td>{pad.imagePath}</td>

                        <td>{pad.score}</td>
                        <td>{pad.idPaciente ? <Link to={`paciente/${pad.idPaciente.id}`}>{pad.idPaciente.id}</Link> : ''}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pad.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pad.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pad.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.pad.home.notFound">No Pads found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padList && padList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pad, ...storeState }: IRootState) => ({
  pacientes: storeState.paciente.entities,
  padList: pad.entities,
  totalItems: pad.totalItems
});

const mapDispatchToProps = {
  getPacientes,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Pad);
