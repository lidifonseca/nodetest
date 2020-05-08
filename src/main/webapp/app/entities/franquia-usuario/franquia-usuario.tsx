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
import { getFranquiaUsuarioState, IFranquiaUsuarioBaseState, getEntities } from './franquia-usuario.reducer';
import { IFranquiaUsuario } from 'app/shared/model/franquia-usuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IFranquiaUsuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IFranquiaUsuarioState extends IFranquiaUsuarioBaseState, IPaginationBaseState {}

export class FranquiaUsuario extends React.Component<IFranquiaUsuarioProps, IFranquiaUsuarioState> {
  private myFormRef: any;

  constructor(props: IFranquiaUsuarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getFranquiaUsuarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
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
        ativo: ''
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
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { franquiaUsuarioList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Franquia Usuarios</span>
          <Button id="togglerFilterFranquiaUsuario" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.franquiaUsuario.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.franquiaUsuario.home.createLabel">Create a new Franquia Usuario</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquia Usuarios</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterFranquiaUsuario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'senha' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="senhaLabel" for="franquia-usuario-senha">
                              <Translate contentKey="generadorApp.franquiaUsuario.senha">Senha</Translate>
                            </Label>

                            <AvInput type="text" name="senha" id="franquia-usuario-senha" value={this.state.senha} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nome' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nomeLabel" for="franquia-usuario-nome">
                              <Translate contentKey="generadorApp.franquiaUsuario.nome">Nome</Translate>
                            </Label>

                            <AvInput type="text" name="nome" id="franquia-usuario-nome" value={this.state.nome} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'email' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="emailLabel" for="franquia-usuario-email">
                              <Translate contentKey="generadorApp.franquiaUsuario.email">Email</Translate>
                            </Label>

                            <AvInput type="text" name="email" id="franquia-usuario-email" value={this.state.email} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'cadProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'ediProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'delProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'relProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'verPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPacienteLabel" for="franquia-usuario-verPaciente">
                              <Translate contentKey="generadorApp.franquiaUsuario.verPaciente">Ver Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="verPaciente" id="franquia-usuario-verPaciente" value={this.state.verPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPacienteLabel" for="franquia-usuario-cadPaciente">
                              <Translate contentKey="generadorApp.franquiaUsuario.cadPaciente">Cad Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="cadPaciente" id="franquia-usuario-cadPaciente" value={this.state.cadPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediPacienteLabel" for="franquia-usuario-ediPaciente">
                              <Translate contentKey="generadorApp.franquiaUsuario.ediPaciente">Edi Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="ediPaciente" id="franquia-usuario-ediPaciente" value={this.state.ediPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delPacienteLabel" for="franquia-usuario-delPaciente">
                              <Translate contentKey="generadorApp.franquiaUsuario.delPaciente">Del Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="delPaciente" id="franquia-usuario-delPaciente" value={this.state.delPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relPacienteLabel" for="franquia-usuario-relPaciente">
                              <Translate contentKey="generadorApp.franquiaUsuario.relPaciente">Rel Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="relPaciente" id="franquia-usuario-relPaciente" value={this.state.relPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPadLabel" for="franquia-usuario-verPad">
                              <Translate contentKey="generadorApp.franquiaUsuario.verPad">Ver Pad</Translate>
                            </Label>
                            <AvInput type="string" name="verPad" id="franquia-usuario-verPad" value={this.state.verPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPadLabel" for="franquia-usuario-cadPad">
                              <Translate contentKey="generadorApp.franquiaUsuario.cadPad">Cad Pad</Translate>
                            </Label>
                            <AvInput type="string" name="cadPad" id="franquia-usuario-cadPad" value={this.state.cadPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediPadLabel" for="franquia-usuario-ediPad">
                              <Translate contentKey="generadorApp.franquiaUsuario.ediPad">Edi Pad</Translate>
                            </Label>
                            <AvInput type="string" name="ediPad" id="franquia-usuario-ediPad" value={this.state.ediPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delPadLabel" for="franquia-usuario-delPad">
                              <Translate contentKey="generadorApp.franquiaUsuario.delPad">Del Pad</Translate>
                            </Label>
                            <AvInput type="string" name="delPad" id="franquia-usuario-delPad" value={this.state.delPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relPadLabel" for="franquia-usuario-relPad">
                              <Translate contentKey="generadorApp.franquiaUsuario.relPad">Rel Pad</Translate>
                            </Label>
                            <AvInput type="string" name="relPad" id="franquia-usuario-relPad" value={this.state.relPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'cadAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'ediAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'delAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'relAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'verPush' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPushLabel" for="franquia-usuario-verPush">
                              <Translate contentKey="generadorApp.franquiaUsuario.verPush">Ver Push</Translate>
                            </Label>
                            <AvInput type="string" name="verPush" id="franquia-usuario-verPush" value={this.state.verPush} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPush' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPushLabel" for="franquia-usuario-cadPush">
                              <Translate contentKey="generadorApp.franquiaUsuario.cadPush">Cad Push</Translate>
                            </Label>
                            <AvInput type="string" name="cadPush" id="franquia-usuario-cadPush" value={this.state.cadPush} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'cadEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'ediEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'delEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'verUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verUsuarioLabel" for="franquia-usuario-verUsuario">
                              <Translate contentKey="generadorApp.franquiaUsuario.verUsuario">Ver Usuario</Translate>
                            </Label>
                            <AvInput type="string" name="verUsuario" id="franquia-usuario-verUsuario" value={this.state.verUsuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadUsuarioLabel" for="franquia-usuario-cadUsuario">
                              <Translate contentKey="generadorApp.franquiaUsuario.cadUsuario">Cad Usuario</Translate>
                            </Label>
                            <AvInput type="string" name="cadUsuario" id="franquia-usuario-cadUsuario" value={this.state.cadUsuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediUsuarioLabel" for="franquia-usuario-ediUsuario">
                              <Translate contentKey="generadorApp.franquiaUsuario.ediUsuario">Edi Usuario</Translate>
                            </Label>
                            <AvInput type="string" name="ediUsuario" id="franquia-usuario-ediUsuario" value={this.state.ediUsuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delUsuarioLabel" for="franquia-usuario-delUsuario">
                              <Translate contentKey="generadorApp.franquiaUsuario.delUsuario">Del Usuario</Translate>
                            </Label>
                            <AvInput type="string" name="delUsuario" id="franquia-usuario-delUsuario" value={this.state.delUsuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioRecusa' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioRecusaLabel" for="franquia-usuario-envioRecusa">
                              <Translate contentKey="generadorApp.franquiaUsuario.envioRecusa">Envio Recusa</Translate>
                            </Label>
                            <AvInput type="string" name="envioRecusa" id="franquia-usuario-envioRecusa" value={this.state.envioRecusa} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioIntercorrencia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'envioCancelamento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="franquia-usuario-ativo">
                              <Translate contentKey="generadorApp.franquiaUsuario.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="franquia-usuario-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.franquiaUsuario.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.franquiaUsuario.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'senha' ? (
                        <th className="hand" onClick={this.sort('senha')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.senha">Senha</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nome' ? (
                        <th className="hand" onClick={this.sort('nome')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.nome">Nome</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'email' ? (
                        <th className="hand" onClick={this.sort('email')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.email">Email</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verProfissional' ? (
                        <th className="hand" onClick={this.sort('verProfissional')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.verProfissional">Ver Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadProfissional' ? (
                        <th className="hand" onClick={this.sort('cadProfissional')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.cadProfissional">Cad Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediProfissional' ? (
                        <th className="hand" onClick={this.sort('ediProfissional')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.ediProfissional">Edi Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delProfissional' ? (
                        <th className="hand" onClick={this.sort('delProfissional')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.delProfissional">Del Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'relProfissional' ? (
                        <th className="hand" onClick={this.sort('relProfissional')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.relProfissional">Rel Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verPaciente' ? (
                        <th className="hand" onClick={this.sort('verPaciente')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.verPaciente">Ver Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadPaciente' ? (
                        <th className="hand" onClick={this.sort('cadPaciente')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.cadPaciente">Cad Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediPaciente' ? (
                        <th className="hand" onClick={this.sort('ediPaciente')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.ediPaciente">Edi Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delPaciente' ? (
                        <th className="hand" onClick={this.sort('delPaciente')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.delPaciente">Del Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'relPaciente' ? (
                        <th className="hand" onClick={this.sort('relPaciente')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.relPaciente">Rel Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verPad' ? (
                        <th className="hand" onClick={this.sort('verPad')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.verPad">Ver Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadPad' ? (
                        <th className="hand" onClick={this.sort('cadPad')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.cadPad">Cad Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediPad' ? (
                        <th className="hand" onClick={this.sort('ediPad')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.ediPad">Edi Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delPad' ? (
                        <th className="hand" onClick={this.sort('delPad')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.delPad">Del Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'relPad' ? (
                        <th className="hand" onClick={this.sort('relPad')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.relPad">Rel Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verAtendimento' ? (
                        <th className="hand" onClick={this.sort('verAtendimento')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.verAtendimento">Ver Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadAtendimento' ? (
                        <th className="hand" onClick={this.sort('cadAtendimento')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.cadAtendimento">Cad Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediAtendimento' ? (
                        <th className="hand" onClick={this.sort('ediAtendimento')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.ediAtendimento">Edi Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delAtendimento' ? (
                        <th className="hand" onClick={this.sort('delAtendimento')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.delAtendimento">Del Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'relAtendimento' ? (
                        <th className="hand" onClick={this.sort('relAtendimento')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.relAtendimento">Rel Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verPush' ? (
                        <th className="hand" onClick={this.sort('verPush')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.verPush">Ver Push</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadPush' ? (
                        <th className="hand" onClick={this.sort('cadPush')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.cadPush">Cad Push</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verEspecialidadeValor' ? (
                        <th className="hand" onClick={this.sort('verEspecialidadeValor')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.verEspecialidadeValor">Ver Especialidade Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadEspecialidadeValor' ? (
                        <th className="hand" onClick={this.sort('cadEspecialidadeValor')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.cadEspecialidadeValor">Cad Especialidade Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediEspecialidadeValor' ? (
                        <th className="hand" onClick={this.sort('ediEspecialidadeValor')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.ediEspecialidadeValor">Edi Especialidade Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delEspecialidadeValor' ? (
                        <th className="hand" onClick={this.sort('delEspecialidadeValor')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.delEspecialidadeValor">Del Especialidade Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verUsuario' ? (
                        <th className="hand" onClick={this.sort('verUsuario')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.verUsuario">Ver Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadUsuario' ? (
                        <th className="hand" onClick={this.sort('cadUsuario')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.cadUsuario">Cad Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediUsuario' ? (
                        <th className="hand" onClick={this.sort('ediUsuario')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.ediUsuario">Edi Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delUsuario' ? (
                        <th className="hand" onClick={this.sort('delUsuario')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.delUsuario">Del Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'envioRecusa' ? (
                        <th className="hand" onClick={this.sort('envioRecusa')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.envioRecusa">Envio Recusa</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'envioIntercorrencia' ? (
                        <th className="hand" onClick={this.sort('envioIntercorrencia')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.envioIntercorrencia">Envio Intercorrencia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'envioCancelamento' ? (
                        <th className="hand" onClick={this.sort('envioCancelamento')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.envioCancelamento">Envio Cancelamento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.franquiaUsuario.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'senha' ? <td>{franquiaUsuario.senha}</td> : null}

                        {this.state.baseFilters !== 'nome' ? <td>{franquiaUsuario.nome}</td> : null}

                        {this.state.baseFilters !== 'email' ? <td>{franquiaUsuario.email}</td> : null}

                        {this.state.baseFilters !== 'verProfissional' ? <td>{franquiaUsuario.verProfissional}</td> : null}

                        {this.state.baseFilters !== 'cadProfissional' ? <td>{franquiaUsuario.cadProfissional}</td> : null}

                        {this.state.baseFilters !== 'ediProfissional' ? <td>{franquiaUsuario.ediProfissional}</td> : null}

                        {this.state.baseFilters !== 'delProfissional' ? <td>{franquiaUsuario.delProfissional}</td> : null}

                        {this.state.baseFilters !== 'relProfissional' ? <td>{franquiaUsuario.relProfissional}</td> : null}

                        {this.state.baseFilters !== 'verPaciente' ? <td>{franquiaUsuario.verPaciente}</td> : null}

                        {this.state.baseFilters !== 'cadPaciente' ? <td>{franquiaUsuario.cadPaciente}</td> : null}

                        {this.state.baseFilters !== 'ediPaciente' ? <td>{franquiaUsuario.ediPaciente}</td> : null}

                        {this.state.baseFilters !== 'delPaciente' ? <td>{franquiaUsuario.delPaciente}</td> : null}

                        {this.state.baseFilters !== 'relPaciente' ? <td>{franquiaUsuario.relPaciente}</td> : null}

                        {this.state.baseFilters !== 'verPad' ? <td>{franquiaUsuario.verPad}</td> : null}

                        {this.state.baseFilters !== 'cadPad' ? <td>{franquiaUsuario.cadPad}</td> : null}

                        {this.state.baseFilters !== 'ediPad' ? <td>{franquiaUsuario.ediPad}</td> : null}

                        {this.state.baseFilters !== 'delPad' ? <td>{franquiaUsuario.delPad}</td> : null}

                        {this.state.baseFilters !== 'relPad' ? <td>{franquiaUsuario.relPad}</td> : null}

                        {this.state.baseFilters !== 'verAtendimento' ? <td>{franquiaUsuario.verAtendimento}</td> : null}

                        {this.state.baseFilters !== 'cadAtendimento' ? <td>{franquiaUsuario.cadAtendimento}</td> : null}

                        {this.state.baseFilters !== 'ediAtendimento' ? <td>{franquiaUsuario.ediAtendimento}</td> : null}

                        {this.state.baseFilters !== 'delAtendimento' ? <td>{franquiaUsuario.delAtendimento}</td> : null}

                        {this.state.baseFilters !== 'relAtendimento' ? <td>{franquiaUsuario.relAtendimento}</td> : null}

                        {this.state.baseFilters !== 'verPush' ? <td>{franquiaUsuario.verPush}</td> : null}

                        {this.state.baseFilters !== 'cadPush' ? <td>{franquiaUsuario.cadPush}</td> : null}

                        {this.state.baseFilters !== 'verEspecialidadeValor' ? <td>{franquiaUsuario.verEspecialidadeValor}</td> : null}

                        {this.state.baseFilters !== 'cadEspecialidadeValor' ? <td>{franquiaUsuario.cadEspecialidadeValor}</td> : null}

                        {this.state.baseFilters !== 'ediEspecialidadeValor' ? <td>{franquiaUsuario.ediEspecialidadeValor}</td> : null}

                        {this.state.baseFilters !== 'delEspecialidadeValor' ? <td>{franquiaUsuario.delEspecialidadeValor}</td> : null}

                        {this.state.baseFilters !== 'verUsuario' ? <td>{franquiaUsuario.verUsuario}</td> : null}

                        {this.state.baseFilters !== 'cadUsuario' ? <td>{franquiaUsuario.cadUsuario}</td> : null}

                        {this.state.baseFilters !== 'ediUsuario' ? <td>{franquiaUsuario.ediUsuario}</td> : null}

                        {this.state.baseFilters !== 'delUsuario' ? <td>{franquiaUsuario.delUsuario}</td> : null}

                        {this.state.baseFilters !== 'envioRecusa' ? <td>{franquiaUsuario.envioRecusa}</td> : null}

                        {this.state.baseFilters !== 'envioIntercorrencia' ? <td>{franquiaUsuario.envioIntercorrencia}</td> : null}

                        {this.state.baseFilters !== 'envioCancelamento' ? <td>{franquiaUsuario.envioCancelamento}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{franquiaUsuario.ativo}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${franquiaUsuario.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${franquiaUsuario.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${franquiaUsuario.id}/delete?${this.getFiltersURL()}`}
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
  franquiaUsuarioList: franquiaUsuario.entities,
  totalItems: franquiaUsuario.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaUsuario);
