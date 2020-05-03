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
import { getEntities } from './franquia-usuario.reducer';
import { IFranquiaUsuario } from 'app/shared/model/franquia-usuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';

export interface IFranquiaUsuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IFranquiaUsuarioBaseState {
  senha: any;
  nome: any;
  email: any;
  verProfissional: any;
  cadProfissional: any;
  ediProfissional: any;
  delProfissional: any;
  relProfissional: any;
  verPaciente: any;
  cadPaciente: any;
  ediPaciente: any;
  delPaciente: any;
  relPaciente: any;
  verPad: any;
  cadPad: any;
  ediPad: any;
  delPad: any;
  relPad: any;
  verAtendimento: any;
  cadAtendimento: any;
  ediAtendimento: any;
  delAtendimento: any;
  relAtendimento: any;
  verPush: any;
  cadPush: any;
  verEspecialidadeValor: any;
  cadEspecialidadeValor: any;
  ediEspecialidadeValor: any;
  delEspecialidadeValor: any;
  verUsuario: any;
  cadUsuario: any;
  ediUsuario: any;
  delUsuario: any;
  envioRecusa: any;
  envioIntercorrencia: any;
  envioCancelamento: any;
  ativo: any;
  dataPost: any;
  logUserFranquia: any;
  idFranquia: any;
}
export interface IFranquiaUsuarioState extends IFranquiaUsuarioBaseState, IPaginationBaseState {}

export class FranquiaUsuario extends React.Component<IFranquiaUsuarioProps, IFranquiaUsuarioState> {
  private myFormRef: any;

  constructor(props: IFranquiaUsuarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getFranquiaUsuarioState(this.props.location)
    };
  }

  getFranquiaUsuarioState = (location): IFranquiaUsuarioBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const senha = url.searchParams.get('senha') || '';
    const nome = url.searchParams.get('nome') || '';
    const email = url.searchParams.get('email') || '';
    const verProfissional = url.searchParams.get('verProfissional') || '';
    const cadProfissional = url.searchParams.get('cadProfissional') || '';
    const ediProfissional = url.searchParams.get('ediProfissional') || '';
    const delProfissional = url.searchParams.get('delProfissional') || '';
    const relProfissional = url.searchParams.get('relProfissional') || '';
    const verPaciente = url.searchParams.get('verPaciente') || '';
    const cadPaciente = url.searchParams.get('cadPaciente') || '';
    const ediPaciente = url.searchParams.get('ediPaciente') || '';
    const delPaciente = url.searchParams.get('delPaciente') || '';
    const relPaciente = url.searchParams.get('relPaciente') || '';
    const verPad = url.searchParams.get('verPad') || '';
    const cadPad = url.searchParams.get('cadPad') || '';
    const ediPad = url.searchParams.get('ediPad') || '';
    const delPad = url.searchParams.get('delPad') || '';
    const relPad = url.searchParams.get('relPad') || '';
    const verAtendimento = url.searchParams.get('verAtendimento') || '';
    const cadAtendimento = url.searchParams.get('cadAtendimento') || '';
    const ediAtendimento = url.searchParams.get('ediAtendimento') || '';
    const delAtendimento = url.searchParams.get('delAtendimento') || '';
    const relAtendimento = url.searchParams.get('relAtendimento') || '';
    const verPush = url.searchParams.get('verPush') || '';
    const cadPush = url.searchParams.get('cadPush') || '';
    const verEspecialidadeValor = url.searchParams.get('verEspecialidadeValor') || '';
    const cadEspecialidadeValor = url.searchParams.get('cadEspecialidadeValor') || '';
    const ediEspecialidadeValor = url.searchParams.get('ediEspecialidadeValor') || '';
    const delEspecialidadeValor = url.searchParams.get('delEspecialidadeValor') || '';
    const verUsuario = url.searchParams.get('verUsuario') || '';
    const cadUsuario = url.searchParams.get('cadUsuario') || '';
    const ediUsuario = url.searchParams.get('ediUsuario') || '';
    const delUsuario = url.searchParams.get('delUsuario') || '';
    const envioRecusa = url.searchParams.get('envioRecusa') || '';
    const envioIntercorrencia = url.searchParams.get('envioIntercorrencia') || '';
    const envioCancelamento = url.searchParams.get('envioCancelamento') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    const logUserFranquia = url.searchParams.get('logUserFranquia') || '';
    const idFranquia = url.searchParams.get('idFranquia') || '';

    return {
      senha,
      nome,
      email,
      verProfissional,
      cadProfissional,
      ediProfissional,
      delProfissional,
      relProfissional,
      verPaciente,
      cadPaciente,
      ediPaciente,
      delPaciente,
      relPaciente,
      verPad,
      cadPad,
      ediPad,
      delPad,
      relPad,
      verAtendimento,
      cadAtendimento,
      ediAtendimento,
      delAtendimento,
      relAtendimento,
      verPush,
      cadPush,
      verEspecialidadeValor,
      cadEspecialidadeValor,
      ediEspecialidadeValor,
      delEspecialidadeValor,
      verUsuario,
      cadUsuario,
      ediUsuario,
      delUsuario,
      envioRecusa,
      envioIntercorrencia,
      envioCancelamento,
      ativo,
      dataPost,
      logUserFranquia,
      idFranquia
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getFranquias();
  }

  cancelCourse = () => {
    this.setState(
      {
        senha: '',
        nome: '',
        email: '',
        verProfissional: '',
        cadProfissional: '',
        ediProfissional: '',
        delProfissional: '',
        relProfissional: '',
        verPaciente: '',
        cadPaciente: '',
        ediPaciente: '',
        delPaciente: '',
        relPaciente: '',
        verPad: '',
        cadPad: '',
        ediPad: '',
        delPad: '',
        relPad: '',
        verAtendimento: '',
        cadAtendimento: '',
        ediAtendimento: '',
        delAtendimento: '',
        relAtendimento: '',
        verPush: '',
        cadPush: '',
        verEspecialidadeValor: '',
        cadEspecialidadeValor: '',
        ediEspecialidadeValor: '',
        delEspecialidadeValor: '',
        verUsuario: '',
        cadUsuario: '',
        ediUsuario: '',
        delUsuario: '',
        envioRecusa: '',
        envioIntercorrencia: '',
        envioCancelamento: '',
        ativo: '',
        dataPost: '',
        logUserFranquia: '',
        idFranquia: ''
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
      'senha=' +
      this.state.senha +
      '&' +
      'nome=' +
      this.state.nome +
      '&' +
      'email=' +
      this.state.email +
      '&' +
      'verProfissional=' +
      this.state.verProfissional +
      '&' +
      'cadProfissional=' +
      this.state.cadProfissional +
      '&' +
      'ediProfissional=' +
      this.state.ediProfissional +
      '&' +
      'delProfissional=' +
      this.state.delProfissional +
      '&' +
      'relProfissional=' +
      this.state.relProfissional +
      '&' +
      'verPaciente=' +
      this.state.verPaciente +
      '&' +
      'cadPaciente=' +
      this.state.cadPaciente +
      '&' +
      'ediPaciente=' +
      this.state.ediPaciente +
      '&' +
      'delPaciente=' +
      this.state.delPaciente +
      '&' +
      'relPaciente=' +
      this.state.relPaciente +
      '&' +
      'verPad=' +
      this.state.verPad +
      '&' +
      'cadPad=' +
      this.state.cadPad +
      '&' +
      'ediPad=' +
      this.state.ediPad +
      '&' +
      'delPad=' +
      this.state.delPad +
      '&' +
      'relPad=' +
      this.state.relPad +
      '&' +
      'verAtendimento=' +
      this.state.verAtendimento +
      '&' +
      'cadAtendimento=' +
      this.state.cadAtendimento +
      '&' +
      'ediAtendimento=' +
      this.state.ediAtendimento +
      '&' +
      'delAtendimento=' +
      this.state.delAtendimento +
      '&' +
      'relAtendimento=' +
      this.state.relAtendimento +
      '&' +
      'verPush=' +
      this.state.verPush +
      '&' +
      'cadPush=' +
      this.state.cadPush +
      '&' +
      'verEspecialidadeValor=' +
      this.state.verEspecialidadeValor +
      '&' +
      'cadEspecialidadeValor=' +
      this.state.cadEspecialidadeValor +
      '&' +
      'ediEspecialidadeValor=' +
      this.state.ediEspecialidadeValor +
      '&' +
      'delEspecialidadeValor=' +
      this.state.delEspecialidadeValor +
      '&' +
      'verUsuario=' +
      this.state.verUsuario +
      '&' +
      'cadUsuario=' +
      this.state.cadUsuario +
      '&' +
      'ediUsuario=' +
      this.state.ediUsuario +
      '&' +
      'delUsuario=' +
      this.state.delUsuario +
      '&' +
      'envioRecusa=' +
      this.state.envioRecusa +
      '&' +
      'envioIntercorrencia=' +
      this.state.envioIntercorrencia +
      '&' +
      'envioCancelamento=' +
      this.state.envioCancelamento +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'logUserFranquia=' +
      this.state.logUserFranquia +
      '&' +
      'idFranquia=' +
      this.state.idFranquia +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      senha,
      nome,
      email,
      verProfissional,
      cadProfissional,
      ediProfissional,
      delProfissional,
      relProfissional,
      verPaciente,
      cadPaciente,
      ediPaciente,
      delPaciente,
      relPaciente,
      verPad,
      cadPad,
      ediPad,
      delPad,
      relPad,
      verAtendimento,
      cadAtendimento,
      ediAtendimento,
      delAtendimento,
      relAtendimento,
      verPush,
      cadPush,
      verEspecialidadeValor,
      cadEspecialidadeValor,
      ediEspecialidadeValor,
      delEspecialidadeValor,
      verUsuario,
      cadUsuario,
      ediUsuario,
      delUsuario,
      envioRecusa,
      envioIntercorrencia,
      envioCancelamento,
      ativo,
      dataPost,
      logUserFranquia,
      idFranquia,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      senha,
      nome,
      email,
      verProfissional,
      cadProfissional,
      ediProfissional,
      delProfissional,
      relProfissional,
      verPaciente,
      cadPaciente,
      ediPaciente,
      delPaciente,
      relPaciente,
      verPad,
      cadPad,
      ediPad,
      delPad,
      relPad,
      verAtendimento,
      cadAtendimento,
      ediAtendimento,
      delAtendimento,
      relAtendimento,
      verPush,
      cadPush,
      verEspecialidadeValor,
      cadEspecialidadeValor,
      ediEspecialidadeValor,
      delEspecialidadeValor,
      verUsuario,
      cadUsuario,
      ediUsuario,
      delUsuario,
      envioRecusa,
      envioIntercorrencia,
      envioCancelamento,
      ativo,
      dataPost,
      logUserFranquia,
      idFranquia,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { franquias, franquiaUsuarioList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquia Usuarios</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Franquia Usuarios</span>
              <Button id="togglerFilterFranquiaUsuario" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.franquiaUsuario.home.createLabel">Create a new Franquia Usuario</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterFranquiaUsuario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="senhaLabel" for="franquia-usuario-senha">
                            <Translate contentKey="generadorApp.franquiaUsuario.senha">Senha</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="senha"
                            id="franquia-usuario-senha"
                            value={this.state.senha}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeLabel" for="franquia-usuario-nome">
                            <Translate contentKey="generadorApp.franquiaUsuario.nome">Nome</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nome"
                            id="franquia-usuario-nome"
                            value={this.state.nome}
                            validate={{
                              maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="emailLabel" for="franquia-usuario-email">
                            <Translate contentKey="generadorApp.franquiaUsuario.email">Email</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="email"
                            id="franquia-usuario-email"
                            value={this.state.email}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verProfissionalLabel" for="franquia-usuario-verProfissional">
                            <Translate contentKey="generadorApp.franquiaUsuario.verProfissional">Ver Profissional</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="verProfissional"
                            id="franquia-usuario-verProfissional"
                            value={this.state.verProfissional}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadProfissionalLabel" for="franquia-usuario-cadProfissional">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadProfissional">Cad Profissional</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="cadProfissional"
                            id="franquia-usuario-cadProfissional"
                            value={this.state.cadProfissional}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediProfissionalLabel" for="franquia-usuario-ediProfissional">
                            <Translate contentKey="generadorApp.franquiaUsuario.ediProfissional">Edi Profissional</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="ediProfissional"
                            id="franquia-usuario-ediProfissional"
                            value={this.state.ediProfissional}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delProfissionalLabel" for="franquia-usuario-delProfissional">
                            <Translate contentKey="generadorApp.franquiaUsuario.delProfissional">Del Profissional</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="delProfissional"
                            id="franquia-usuario-delProfissional"
                            value={this.state.delProfissional}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="relProfissionalLabel" for="franquia-usuario-relProfissional">
                            <Translate contentKey="generadorApp.franquiaUsuario.relProfissional">Rel Profissional</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="relProfissional"
                            id="franquia-usuario-relProfissional"
                            value={this.state.relProfissional}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verPacienteLabel" for="franquia-usuario-verPaciente">
                            <Translate contentKey="generadorApp.franquiaUsuario.verPaciente">Ver Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="verPaciente" id="franquia-usuario-verPaciente" value={this.state.verPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadPacienteLabel" for="franquia-usuario-cadPaciente">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadPaciente">Cad Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="cadPaciente" id="franquia-usuario-cadPaciente" value={this.state.cadPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediPacienteLabel" for="franquia-usuario-ediPaciente">
                            <Translate contentKey="generadorApp.franquiaUsuario.ediPaciente">Edi Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="ediPaciente" id="franquia-usuario-ediPaciente" value={this.state.ediPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delPacienteLabel" for="franquia-usuario-delPaciente">
                            <Translate contentKey="generadorApp.franquiaUsuario.delPaciente">Del Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="delPaciente" id="franquia-usuario-delPaciente" value={this.state.delPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="relPacienteLabel" for="franquia-usuario-relPaciente">
                            <Translate contentKey="generadorApp.franquiaUsuario.relPaciente">Rel Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="relPaciente" id="franquia-usuario-relPaciente" value={this.state.relPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verPadLabel" for="franquia-usuario-verPad">
                            <Translate contentKey="generadorApp.franquiaUsuario.verPad">Ver Pad</Translate>
                          </Label>
                          <AvInput type="string" name="verPad" id="franquia-usuario-verPad" value={this.state.verPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadPadLabel" for="franquia-usuario-cadPad">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadPad">Cad Pad</Translate>
                          </Label>
                          <AvInput type="string" name="cadPad" id="franquia-usuario-cadPad" value={this.state.cadPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediPadLabel" for="franquia-usuario-ediPad">
                            <Translate contentKey="generadorApp.franquiaUsuario.ediPad">Edi Pad</Translate>
                          </Label>
                          <AvInput type="string" name="ediPad" id="franquia-usuario-ediPad" value={this.state.ediPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delPadLabel" for="franquia-usuario-delPad">
                            <Translate contentKey="generadorApp.franquiaUsuario.delPad">Del Pad</Translate>
                          </Label>
                          <AvInput type="string" name="delPad" id="franquia-usuario-delPad" value={this.state.delPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="relPadLabel" for="franquia-usuario-relPad">
                            <Translate contentKey="generadorApp.franquiaUsuario.relPad">Rel Pad</Translate>
                          </Label>
                          <AvInput type="string" name="relPad" id="franquia-usuario-relPad" value={this.state.relPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verAtendimentoLabel" for="franquia-usuario-verAtendimento">
                            <Translate contentKey="generadorApp.franquiaUsuario.verAtendimento">Ver Atendimento</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="verAtendimento"
                            id="franquia-usuario-verAtendimento"
                            value={this.state.verAtendimento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadAtendimentoLabel" for="franquia-usuario-cadAtendimento">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadAtendimento">Cad Atendimento</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="cadAtendimento"
                            id="franquia-usuario-cadAtendimento"
                            value={this.state.cadAtendimento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediAtendimentoLabel" for="franquia-usuario-ediAtendimento">
                            <Translate contentKey="generadorApp.franquiaUsuario.ediAtendimento">Edi Atendimento</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="ediAtendimento"
                            id="franquia-usuario-ediAtendimento"
                            value={this.state.ediAtendimento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delAtendimentoLabel" for="franquia-usuario-delAtendimento">
                            <Translate contentKey="generadorApp.franquiaUsuario.delAtendimento">Del Atendimento</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="delAtendimento"
                            id="franquia-usuario-delAtendimento"
                            value={this.state.delAtendimento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="relAtendimentoLabel" for="franquia-usuario-relAtendimento">
                            <Translate contentKey="generadorApp.franquiaUsuario.relAtendimento">Rel Atendimento</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="relAtendimento"
                            id="franquia-usuario-relAtendimento"
                            value={this.state.relAtendimento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verPushLabel" for="franquia-usuario-verPush">
                            <Translate contentKey="generadorApp.franquiaUsuario.verPush">Ver Push</Translate>
                          </Label>
                          <AvInput type="string" name="verPush" id="franquia-usuario-verPush" value={this.state.verPush} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadPushLabel" for="franquia-usuario-cadPush">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadPush">Cad Push</Translate>
                          </Label>
                          <AvInput type="string" name="cadPush" id="franquia-usuario-cadPush" value={this.state.cadPush} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verEspecialidadeValorLabel" for="franquia-usuario-verEspecialidadeValor">
                            <Translate contentKey="generadorApp.franquiaUsuario.verEspecialidadeValor">Ver Especialidade Valor</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="verEspecialidadeValor"
                            id="franquia-usuario-verEspecialidadeValor"
                            value={this.state.verEspecialidadeValor}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadEspecialidadeValorLabel" for="franquia-usuario-cadEspecialidadeValor">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadEspecialidadeValor">Cad Especialidade Valor</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="cadEspecialidadeValor"
                            id="franquia-usuario-cadEspecialidadeValor"
                            value={this.state.cadEspecialidadeValor}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediEspecialidadeValorLabel" for="franquia-usuario-ediEspecialidadeValor">
                            <Translate contentKey="generadorApp.franquiaUsuario.ediEspecialidadeValor">Edi Especialidade Valor</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="ediEspecialidadeValor"
                            id="franquia-usuario-ediEspecialidadeValor"
                            value={this.state.ediEspecialidadeValor}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delEspecialidadeValorLabel" for="franquia-usuario-delEspecialidadeValor">
                            <Translate contentKey="generadorApp.franquiaUsuario.delEspecialidadeValor">Del Especialidade Valor</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="delEspecialidadeValor"
                            id="franquia-usuario-delEspecialidadeValor"
                            value={this.state.delEspecialidadeValor}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verUsuarioLabel" for="franquia-usuario-verUsuario">
                            <Translate contentKey="generadorApp.franquiaUsuario.verUsuario">Ver Usuario</Translate>
                          </Label>
                          <AvInput type="string" name="verUsuario" id="franquia-usuario-verUsuario" value={this.state.verUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadUsuarioLabel" for="franquia-usuario-cadUsuario">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadUsuario">Cad Usuario</Translate>
                          </Label>
                          <AvInput type="string" name="cadUsuario" id="franquia-usuario-cadUsuario" value={this.state.cadUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediUsuarioLabel" for="franquia-usuario-ediUsuario">
                            <Translate contentKey="generadorApp.franquiaUsuario.ediUsuario">Edi Usuario</Translate>
                          </Label>
                          <AvInput type="string" name="ediUsuario" id="franquia-usuario-ediUsuario" value={this.state.ediUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delUsuarioLabel" for="franquia-usuario-delUsuario">
                            <Translate contentKey="generadorApp.franquiaUsuario.delUsuario">Del Usuario</Translate>
                          </Label>
                          <AvInput type="string" name="delUsuario" id="franquia-usuario-delUsuario" value={this.state.delUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="envioRecusaLabel" for="franquia-usuario-envioRecusa">
                            <Translate contentKey="generadorApp.franquiaUsuario.envioRecusa">Envio Recusa</Translate>
                          </Label>
                          <AvInput type="string" name="envioRecusa" id="franquia-usuario-envioRecusa" value={this.state.envioRecusa} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="envioIntercorrenciaLabel" for="franquia-usuario-envioIntercorrencia">
                            <Translate contentKey="generadorApp.franquiaUsuario.envioIntercorrencia">Envio Intercorrencia</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="envioIntercorrencia"
                            id="franquia-usuario-envioIntercorrencia"
                            value={this.state.envioIntercorrencia}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="envioCancelamentoLabel" for="franquia-usuario-envioCancelamento">
                            <Translate contentKey="generadorApp.franquiaUsuario.envioCancelamento">Envio Cancelamento</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="envioCancelamento"
                            id="franquia-usuario-envioCancelamento"
                            value={this.state.envioCancelamento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="franquia-usuario-ativo">
                            <Translate contentKey="generadorApp.franquiaUsuario.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="franquia-usuario-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="franquia-usuario-dataPost">
                            <Translate contentKey="generadorApp.franquiaUsuario.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="franquia-usuario-dataPost"
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
                            <Label for="franquia-usuario-idFranquia">
                              <Translate contentKey="generadorApp.franquiaUsuario.idFranquia">Id Franquia</Translate>
                            </Label>
                            <AvInput id="franquia-usuario-idFranquia" type="select" className="form-control" name="idFranquiaId">
                              <option value="" key="0" />
                              {franquias
                                ? franquias.map(otherEntity => (
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

              {franquiaUsuarioList && franquiaUsuarioList.length > 0 ? (
                <Table responsive aria-describedby="franquia-usuario-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('senha')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.senha">Senha</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nome')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.nome">Nome</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('email')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.email">Email</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verProfissional')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.verProfissional">Ver Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadProfissional')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.cadProfissional">Cad Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediProfissional')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.ediProfissional">Edi Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delProfissional')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.delProfissional">Del Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('relProfissional')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.relProfissional">Rel Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verPaciente')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.verPaciente">Ver Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadPaciente')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.cadPaciente">Cad Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediPaciente')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.ediPaciente">Edi Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delPaciente')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.delPaciente">Del Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('relPaciente')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.relPaciente">Rel Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verPad')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.verPad">Ver Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadPad')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.cadPad">Cad Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediPad')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.ediPad">Edi Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delPad')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.delPad">Del Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('relPad')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.relPad">Rel Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verAtendimento')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.verAtendimento">Ver Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadAtendimento')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.cadAtendimento">Cad Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediAtendimento')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.ediAtendimento">Edi Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delAtendimento')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.delAtendimento">Del Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('relAtendimento')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.relAtendimento">Rel Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verPush')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.verPush">Ver Push</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadPush')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.cadPush">Cad Push</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verEspecialidadeValor')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.verEspecialidadeValor">Ver Especialidade Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadEspecialidadeValor')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.cadEspecialidadeValor">Cad Especialidade Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediEspecialidadeValor')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.ediEspecialidadeValor">Edi Especialidade Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delEspecialidadeValor')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.delEspecialidadeValor">Del Especialidade Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verUsuario')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.verUsuario">Ver Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadUsuario')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.cadUsuario">Cad Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediUsuario')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.ediUsuario">Edi Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delUsuario')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.delUsuario">Del Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioRecusa')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.envioRecusa">Envio Recusa</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioIntercorrencia')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.envioIntercorrencia">Envio Intercorrencia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioCancelamento')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.envioCancelamento">Envio Cancelamento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.franquiaUsuario.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.franquiaUsuario.idFranquia">Id Franquia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {franquiaUsuarioList.map((franquiaUsuario, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${franquiaUsuario.id}`} color="link" size="sm">
                            {franquiaUsuario.id}
                          </Button>
                        </td>

                        <td>{franquiaUsuario.senha}</td>

                        <td>{franquiaUsuario.nome}</td>

                        <td>{franquiaUsuario.email}</td>

                        <td>{franquiaUsuario.verProfissional}</td>

                        <td>{franquiaUsuario.cadProfissional}</td>

                        <td>{franquiaUsuario.ediProfissional}</td>

                        <td>{franquiaUsuario.delProfissional}</td>

                        <td>{franquiaUsuario.relProfissional}</td>

                        <td>{franquiaUsuario.verPaciente}</td>

                        <td>{franquiaUsuario.cadPaciente}</td>

                        <td>{franquiaUsuario.ediPaciente}</td>

                        <td>{franquiaUsuario.delPaciente}</td>

                        <td>{franquiaUsuario.relPaciente}</td>

                        <td>{franquiaUsuario.verPad}</td>

                        <td>{franquiaUsuario.cadPad}</td>

                        <td>{franquiaUsuario.ediPad}</td>

                        <td>{franquiaUsuario.delPad}</td>

                        <td>{franquiaUsuario.relPad}</td>

                        <td>{franquiaUsuario.verAtendimento}</td>

                        <td>{franquiaUsuario.cadAtendimento}</td>

                        <td>{franquiaUsuario.ediAtendimento}</td>

                        <td>{franquiaUsuario.delAtendimento}</td>

                        <td>{franquiaUsuario.relAtendimento}</td>

                        <td>{franquiaUsuario.verPush}</td>

                        <td>{franquiaUsuario.cadPush}</td>

                        <td>{franquiaUsuario.verEspecialidadeValor}</td>

                        <td>{franquiaUsuario.cadEspecialidadeValor}</td>

                        <td>{franquiaUsuario.ediEspecialidadeValor}</td>

                        <td>{franquiaUsuario.delEspecialidadeValor}</td>

                        <td>{franquiaUsuario.verUsuario}</td>

                        <td>{franquiaUsuario.cadUsuario}</td>

                        <td>{franquiaUsuario.ediUsuario}</td>

                        <td>{franquiaUsuario.delUsuario}</td>

                        <td>{franquiaUsuario.envioRecusa}</td>

                        <td>{franquiaUsuario.envioIntercorrencia}</td>

                        <td>{franquiaUsuario.envioCancelamento}</td>

                        <td>{franquiaUsuario.ativo}</td>

                        <td>
                          <TextFormat type="date" value={franquiaUsuario.dataPost} format={APP_DATE_FORMAT} />
                        </td>
                        <td>
                          {franquiaUsuario.idFranquia ? (
                            <Link to={`franquia/${franquiaUsuario.idFranquia.id}`}>{franquiaUsuario.idFranquia.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${franquiaUsuario.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${franquiaUsuario.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${franquiaUsuario.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.franquiaUsuario.home.notFound">No Franquia Usuarios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={franquiaUsuarioList && franquiaUsuarioList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ franquiaUsuario, ...storeState }: IRootState) => ({
  franquias: storeState.franquia.entities,
  franquiaUsuarioList: franquiaUsuario.entities,
  totalItems: franquiaUsuario.totalItems
});

const mapDispatchToProps = {
  getFranquias,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaUsuario);
