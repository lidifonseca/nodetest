/* eslint complexity: ["error", 300] */
import React from 'react';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Label, UncontrolledTooltip, CardHeader, CardBody, UncontrolledAlert } from 'reactstrap';
import { AvForm, div, AvInput } from 'availity-reactstrap-validation';
import {
  openFile,
  Translate,
  translate,
  ICrudGetAllAction,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal as Panel, ModalHeader as PanelHeader, ModalBody as PanelBody, ModalFooter as PanelFooter } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getPacienteArquivoState, IPacienteArquivoBaseState, getEntities } from './paciente-arquivo.reducer';
import { IPacienteArquivo } from 'app/shared/model/paciente-arquivo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';

export interface IPacienteArquivoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteArquivoState extends IPacienteArquivoBaseState, IPaginationBaseState {}

export class PacienteArquivo extends React.Component<IPacienteArquivoProps, IPacienteArquivoState> {
  private myFormRef: any;

  constructor(props: IPacienteArquivoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacienteArquivoState(this.props.location),
      paciente: this.props.match.params['idPaciente'],
      baseFilters: 'paciente'
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getPacientes();
  }

  cancelCourse = () => {
    this.setState(
      {
        arquivo: '',
        ativo: '',
        paciente: ''
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
      'arquivo=' +
      this.state.arquivo +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'paciente=' +
      this.state.paciente +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { arquivo, ativo, paciente, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(arquivo, ativo, paciente, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { pacientes, pacienteArquivoList, match, totalItems } = this.props;
    let pacienteBaseFilter = null;
    pacientes.map(p => {
      if (p.id === this.state.paciente) pacienteBaseFilter = p;
    });

    return (
      <Panel isOpen>
        <PanelHeader>
          <h2 id="page-heading">
            <span className="page-header">Paciente Arquivos</span>
            <Link
              to={`${match.url}/new?${this.getFiltersURL()}`}
              className="btn btn-primary float-right jh-create-entity"
              id="jh-create-entity"
            >
              <FontAwesomeIcon icon="plus" />
              &nbsp;
              <Translate contentKey="generadorApp.pacienteArquivo.home.createLabel">Create a new Paciente Arquivo</Translate>
            </Link>{' '}
            &nbsp;
          </h2>

          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={'/paciente'}>Pacientes</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={'/paciente/' + this.state[this.state.baseFilters]}>
                {pacienteBaseFilter ? pacienteBaseFilter.nome : this.state[this.state.baseFilters]}
              </Link>
            </li>
            <li className="breadcrumb-item active">Paciente Arquivos</li>
          </ol>
        </PanelHeader>
        <PanelBody>
          <div className="table-responsive">
            {pacienteArquivoList && pacienteArquivoList.length > 0 ? (
              <Table responsive aria-describedby="paciente-arquivo-heading" className={'table-hover table-striped mt-4'}>
                <thead className={'thead-light'}>
                  <tr>
                    <th className="hand" onClick={this.sort('id')}>
                      <Translate contentKey="global.field.id">ID</Translate>
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    {this.state.baseFilters !== 'arquivo' ? (
                      <th className="hand" onClick={this.sort('arquivo')}>
                        <Translate contentKey="generadorApp.pacienteArquivo.arquivo"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                    ) : null}
                    {this.state.baseFilters !== 'paciente' ? (
                      <th>
                        <Translate contentKey="generadorApp.pacienteArquivo.paciente">Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                    ) : null}

                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                  {pacienteArquivoList.map((pacienteArquivo, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        <Button tag={Link} to={`${match.url}/${pacienteArquivo.id}`} color="link" size="sm">
                          {pacienteArquivo.id}
                        </Button>
                      </td>

                      {this.state.baseFilters !== 'arquivo' ? (
                        <td>
                          {pacienteArquivo.arquivo ? (
                            <div>
                              <a rel="noopener noreferrer" target={'_blank'} href={`${pacienteArquivo.arquivo}`}>
                                {pacienteArquivo.arquivoContentType && pacienteArquivo.arquivoContentType.includes('image/') ? (
                                  <img src={`${pacienteArquivo.arquivo}`} style={{ maxHeight: '30px' }} />
                                ) : (
                                  <Translate contentKey="entity.action.open">Open</Translate>
                                )}
                              </a>
                            </div>
                          ) : null}
                        </td>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <td>
                          {pacienteArquivo.paciente ? (
                            <Link to={`paciente/${pacienteArquivo.paciente.id}`}>{pacienteArquivo.paciente.nome}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                      ) : null}

                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${pacienteArquivo.id}?${this.getFiltersURL()}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                          <Button
                            tag={Link}
                            to={`${match.url}/${pacienteArquivo.id}/edit?${this.getFiltersURL()}`}
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
                            to={`${match.url}/${pacienteArquivo.id}/delete?${this.getFiltersURL()}`}
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
                <Translate contentKey="generadorApp.pacienteArquivo.home.notFound">No Paciente Arquivos found</Translate>
              </div>
            )}
          </div>
        </PanelBody>
        <PanelFooter>
          <div className={pacienteArquivoList && pacienteArquivoList.length > 0 ? '' : 'd-none'}>
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
    );
  }
}

const mapStateToProps = ({ pacienteArquivo, ...storeState }: IRootState) => ({
  pacientes: storeState.paciente.entities,
  pacienteArquivoList: pacienteArquivo.entities,
  totalItems: pacienteArquivo.totalItems
});

const mapDispatchToProps = {
  getPacientes,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteArquivo);
