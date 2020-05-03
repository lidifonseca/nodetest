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
import { getEntities } from './files-panico.reducer';
import { IFilesPanico } from 'app/shared/model/files-panico.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IFilesPanicoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IFilesPanicoBaseState {
  idPanico: any;
  idPaciente: any;
  tipo: any;
  imagem: any;
  criadoEm: any;
}
export interface IFilesPanicoState extends IFilesPanicoBaseState, IPaginationBaseState {}

export class FilesPanico extends React.Component<IFilesPanicoProps, IFilesPanicoState> {
  private myFormRef: any;

  constructor(props: IFilesPanicoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getFilesPanicoState(this.props.location)
    };
  }

  getFilesPanicoState = (location): IFilesPanicoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idPanico = url.searchParams.get('idPanico') || '';
    const idPaciente = url.searchParams.get('idPaciente') || '';
    const tipo = url.searchParams.get('tipo') || '';
    const imagem = url.searchParams.get('imagem') || '';
    const criadoEm = url.searchParams.get('criadoEm') || '';

    return {
      idPanico,
      idPaciente,
      tipo,
      imagem,
      criadoEm
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPanico: '',
        idPaciente: '',
        tipo: '',
        imagem: '',
        criadoEm: ''
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
      'idPanico=' +
      this.state.idPanico +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'tipo=' +
      this.state.tipo +
      '&' +
      'imagem=' +
      this.state.imagem +
      '&' +
      'criadoEm=' +
      this.state.criadoEm +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idPanico, idPaciente, tipo, imagem, criadoEm, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idPanico, idPaciente, tipo, imagem, criadoEm, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { filesPanicoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Files Panicos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Files Panicos</span>
              <Button id="togglerFilterFilesPanico" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.filesPanico.home.createLabel">Create a new Files Panico</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterFilesPanico">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idPanicoLabel" for="files-panico-idPanico">
                            <Translate contentKey="generadorApp.filesPanico.idPanico">Id Panico</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idPanico"
                            id="files-panico-idPanico"
                            value={this.state.idPanico}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idPacienteLabel" for="files-panico-idPaciente">
                            <Translate contentKey="generadorApp.filesPanico.idPaciente">Id Paciente</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idPaciente"
                            id="files-panico-idPaciente"
                            value={this.state.idPaciente}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tipoLabel" for="files-panico-tipo">
                            <Translate contentKey="generadorApp.filesPanico.tipo">Tipo</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="tipo"
                            id="files-panico-tipo"
                            value={this.state.tipo}
                            validate={{
                              maxLength: { value: 3, errorMessage: translate('entity.validation.maxlength', { max: 3 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="imagemLabel" for="files-panico-imagem">
                            <Translate contentKey="generadorApp.filesPanico.imagem">Imagem</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="imagem"
                            id="files-panico-imagem"
                            value={this.state.imagem}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="criadoEmLabel" for="files-panico-criadoEm">
                            <Translate contentKey="generadorApp.filesPanico.criadoEm">Criado Em</Translate>
                          </Label>
                          <AvInput
                            id="files-panico-criadoEm"
                            type="datetime-local"
                            className="form-control"
                            name="criadoEm"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.criadoEm ? convertDateTimeFromServer(this.state.criadoEm) : null}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
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

              {filesPanicoList && filesPanicoList.length > 0 ? (
                <Table responsive aria-describedby="files-panico-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPanico')}>
                        <Translate contentKey="generadorApp.filesPanico.idPanico">Id Panico</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPaciente')}>
                        <Translate contentKey="generadorApp.filesPanico.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tipo')}>
                        <Translate contentKey="generadorApp.filesPanico.tipo">Tipo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('imagem')}>
                        <Translate contentKey="generadorApp.filesPanico.imagem">Imagem</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('criadoEm')}>
                        <Translate contentKey="generadorApp.filesPanico.criadoEm">Criado Em</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {filesPanicoList.map((filesPanico, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${filesPanico.id}`} color="link" size="sm">
                            {filesPanico.id}
                          </Button>
                        </td>

                        <td>{filesPanico.idPanico}</td>

                        <td>{filesPanico.idPaciente}</td>

                        <td>{filesPanico.tipo}</td>

                        <td>{filesPanico.imagem}</td>

                        <td>
                          <TextFormat type="date" value={filesPanico.criadoEm} format={APP_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${filesPanico.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${filesPanico.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${filesPanico.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.filesPanico.home.notFound">No Files Panicos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={filesPanicoList && filesPanicoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ filesPanico, ...storeState }: IRootState) => ({
  filesPanicoList: filesPanico.entities,
  totalItems: filesPanico.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FilesPanico);
