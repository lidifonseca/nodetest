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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import { getProfissionalState, IProfissionalBaseState, getEntities } from './profissional.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';

export interface IProfissionalProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalState extends IProfissionalBaseState, IPaginationBaseState {
  dropdownButtons: {};
}

export class Profissional extends React.Component<IProfissionalProps, IProfissionalState> {
  private myFormRef: any;

  constructor(props: IProfissionalProps) {
    super(props);
    this.state = {
      dropdownButtons: {},
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProfissionalState(this.props.location)
    };
  }

  toggle = btn => {
    const dropdownButtons = this.state.dropdownButtons;
    dropdownButtons[btn] = !dropdownButtons[btn];
    this.setState({ dropdownButtons });
  };

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getEspecialidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        idCidade: '',
        idTempoExperiencia: '',
        idBanco: '',
        senha: '',
        nome: '',
        email: '',
        cpf: '',
        rg: '',
        nomeEmpresa: '',
        cnpj: '',
        registro: '',
        nascimento: '',
        sexo: '',
        telefone1: '',
        telefone2: '',
        celular1: '',
        celular2: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        atendeCrianca: '',
        atendeIdoso: '',
        ag: '',
        conta: '',
        tipoConta: '',
        origemCadastro: '',
        obs: '',
        chavePrivada: '',
        ativo: '',
        senhaOriginal: '',
        dataSenha: '',
        expoToken: '',
        preferenciaAtendimento: '',
        atendimentoAceite: '',
        atendimentoAssinaturas: '',
        unidade: '',
        especialidade: ''
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
      'idCidade=' +
      this.state.idCidade +
      '&' +
      'idTempoExperiencia=' +
      this.state.idTempoExperiencia +
      '&' +
      'idBanco=' +
      this.state.idBanco +
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
      'cpf=' +
      this.state.cpf +
      '&' +
      'rg=' +
      this.state.rg +
      '&' +
      'nomeEmpresa=' +
      this.state.nomeEmpresa +
      '&' +
      'cnpj=' +
      this.state.cnpj +
      '&' +
      'registro=' +
      this.state.registro +
      '&' +
      'nascimento=' +
      this.state.nascimento +
      '&' +
      'sexo=' +
      this.state.sexo +
      '&' +
      'telefone1=' +
      this.state.telefone1 +
      '&' +
      'telefone2=' +
      this.state.telefone2 +
      '&' +
      'celular1=' +
      this.state.celular1 +
      '&' +
      'celular2=' +
      this.state.celular2 +
      '&' +
      'cep=' +
      this.state.cep +
      '&' +
      'endereco=' +
      this.state.endereco +
      '&' +
      'numero=' +
      this.state.numero +
      '&' +
      'complemento=' +
      this.state.complemento +
      '&' +
      'bairro=' +
      this.state.bairro +
      '&' +
      'cidade=' +
      this.state.cidade +
      '&' +
      'uf=' +
      this.state.uf +
      '&' +
      'atendeCrianca=' +
      this.state.atendeCrianca +
      '&' +
      'atendeIdoso=' +
      this.state.atendeIdoso +
      '&' +
      'ag=' +
      this.state.ag +
      '&' +
      'conta=' +
      this.state.conta +
      '&' +
      'tipoConta=' +
      this.state.tipoConta +
      '&' +
      'origemCadastro=' +
      this.state.origemCadastro +
      '&' +
      'obs=' +
      this.state.obs +
      '&' +
      'chavePrivada=' +
      this.state.chavePrivada +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'senhaOriginal=' +
      this.state.senhaOriginal +
      '&' +
      'dataSenha=' +
      this.state.dataSenha +
      '&' +
      'expoToken=' +
      this.state.expoToken +
      '&' +
      'preferenciaAtendimento=' +
      this.state.preferenciaAtendimento +
      '&' +
      'atendimentoAceite=' +
      this.state.atendimentoAceite +
      '&' +
      'atendimentoAssinaturas=' +
      this.state.atendimentoAssinaturas +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      'especialidade=' +
      this.state.especialidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idCidade,
      idTempoExperiencia,
      idBanco,
      senha,
      nome,
      email,
      cpf,
      rg,
      nomeEmpresa,
      cnpj,
      registro,
      nascimento,
      sexo,
      telefone1,
      telefone2,
      celular1,
      celular2,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      atendeCrianca,
      atendeIdoso,
      ag,
      conta,
      tipoConta,
      origemCadastro,
      obs,
      chavePrivada,
      ativo,
      senhaOriginal,
      dataSenha,
      expoToken,
      preferenciaAtendimento,
      atendimentoAceite,
      atendimentoAssinaturas,
      unidade,
      especialidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idCidade,
      idTempoExperiencia,
      idBanco,
      senha,
      nome,
      email,
      cpf,
      rg,
      nomeEmpresa,
      cnpj,
      registro,
      nascimento,
      sexo,
      telefone1,
      telefone2,
      celular1,
      celular2,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      atendeCrianca,
      atendeIdoso,
      ag,
      conta,
      tipoConta,
      origemCadastro,
      obs,
      chavePrivada,
      ativo,
      senhaOriginal,
      dataSenha,
      expoToken,
      preferenciaAtendimento,
      atendimentoAceite,
      atendimentoAssinaturas,
      unidade,
      especialidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, especialidades, profissionalList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Profissionals</span>
          <Button id="togglerFilterProfissional" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.profissional.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.profissional.home.createLabel">Create a new Profissional</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissionals</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissional">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'nome' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="nomeLabel" for="profissional-nome">
                              <Translate contentKey="generadorApp.profissional.nome">Nome</Translate>
                            </Label>

                            <AvInput type="text" name="nome" id="profissional-nome" value={this.state.nome} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'registro' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="registroLabel" for="profissional-registro">
                              <Translate contentKey="generadorApp.profissional.registro">Registro</Translate>
                            </Label>

                            <AvInput type="text" name="registro" id="profissional-registro" value={this.state.registro} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cep' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="cepLabel" for="profissional-cep">
                              <Translate contentKey="generadorApp.profissional.cep">Cep</Translate>
                            </Label>

                            <AvInput type="text" name="cep" id="profissional-cep" value={this.state.cep} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'especialidade' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="profissional-especialidade">
                                <Translate contentKey="generadorApp.profissional.especialidade">Especialidade</Translate>
                              </Label>
                              <Select
                                id="profissional-especialidade"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  especialidades
                                    ? especialidades.map(p =>
                                        this.state.especialidade.split(',').indexOf(p.id) !== -1
                                          ? { value: p.id, label: p.especialidade }
                                          : null
                                      )
                                    : null
                                }
                                options={
                                  especialidades ? especialidades.map(option => ({ value: option.id, label: option.especialidade })) : null
                                }
                                onChange={options => this.setState({ especialidade: options.map(option => option['value']).join(',') })}
                                name={'especialidade'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" check>
                              <AvInput id="profissional-ativo" type="checkbox" className="form-control" name="ativo" />
                              <Translate contentKey="generadorApp.profissional.ativo">Ativo</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.profissional.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.profissional.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {profissionalList && profissionalList.length > 0 ? (
                <Table responsive aria-describedby="profissional-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nome')}>
                        <Translate contentKey="generadorApp.profissional.nome"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('registro')}>
                        <Translate contentKey="generadorApp.profissional.registro"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cep')}>
                        <Translate contentKey="generadorApp.profissional.cep"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.profissional.especialidade">Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.profissional.ativo"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {profissionalList.map((profissional, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${profissional.id}`} color="link" size="sm">
                            {profissional.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'nome' ? <td>{profissional.nome}</td> : null}

                        {this.state.baseFilters !== 'registro' ? <td>{profissional.registro}</td> : null}

                        {this.state.baseFilters !== 'cep' ? <td>{profissional.cep}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{profissional.ativo ? 'true' : 'false'}</td> : null}

                        <td className="text-right">
                          <Dropdown isOpen={this.state.dropdownButtons[i]} toggle={() => this.toggle(i)}>
                            <DropdownToggle caret>
                              <Translate contentKey="generadorApp.profissional.dropdown_btn">Actions</Translate>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem tag={Link} to={`${match.url}/${profissional.id}`} color="info" size="sm">
                                <FontAwesomeIcon icon="eye" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.profissional.listButtons.detalhes">Detalhes</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${profissional.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="file-text-o" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.profissional.listButtons.RelatoriodeInformacoes">
                                    RelatóriodeInformações
                                  </Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${profissional.id}/edit`} color="info" size="sm">
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.profissional.listButtons.edit">Editar</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                tag={Link}
                                to={`/profissional-status-atual?baseFilters=profissional&profissional=${profissional.id}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="upload" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.profissional.listButtons.Status">Status</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                tag={Link}
                                to={`/profissional-arquivo?baseFilters=profissional&profissional=${profissional.id}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="upload" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.profissional.listButtons.Arquivos">Arquivos</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${profissional.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="refresh" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.profissional.listButtons.AlterarSenha">AlterarSenha</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${profissional.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="trash" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.profissional.listButtons.delete">Excluir</Translate>
                                </span>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-warning">
                  <Translate contentKey="generadorApp.profissional.home.notFound">No Profissionals found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={profissionalList && profissionalList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ profissional, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  especialidades: storeState.especialidade.entities,
  profissionalList: profissional.entities,
  totalItems: profissional.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEspecialidades,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Profissional);
