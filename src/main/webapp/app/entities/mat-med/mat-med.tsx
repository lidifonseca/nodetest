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
import { getEntities } from './mat-med.reducer';
import { IMatMed } from 'app/shared/model/mat-med.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IMatMedProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IMatMedBaseState {
  nome: any;
  idTipoMatMed: any;
  valor: any;
  ativo: any;
  dataPost: any;
}
export interface IMatMedState extends IMatMedBaseState, IPaginationBaseState {}

export class MatMed extends React.Component<IMatMedProps, IMatMedState> {
  private myFormRef: any;

  constructor(props: IMatMedProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getMatMedState(this.props.location)
    };
  }

  getMatMedState = (location): IMatMedBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const nome = url.searchParams.get('nome') || '';
    const idTipoMatMed = url.searchParams.get('idTipoMatMed') || '';
    const valor = url.searchParams.get('valor') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    return {
      nome,
      idTipoMatMed,
      valor,
      ativo,
      dataPost
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        nome: '',
        idTipoMatMed: '',
        valor: '',
        ativo: '',
        dataPost: ''
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
      'nome=' +
      this.state.nome +
      '&' +
      'idTipoMatMed=' +
      this.state.idTipoMatMed +
      '&' +
      'valor=' +
      this.state.valor +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { nome, idTipoMatMed, valor, ativo, dataPost, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(nome, idTipoMatMed, valor, ativo, dataPost, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { matMedList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Mat Meds</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Mat Meds</span>
              <Button id="togglerFilterMatMed" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.matMed.home.createLabel">Create a new Mat Med</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterMatMed">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="nomeLabel" for="mat-med-nome">
                            <Translate contentKey="generadorApp.matMed.nome">Nome</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nome"
                            id="mat-med-nome"
                            value={this.state.nome}
                            validate={{
                              maxLength: { value: 80, errorMessage: translate('entity.validation.maxlength', { max: 80 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idTipoMatMedLabel" for="mat-med-idTipoMatMed">
                            <Translate contentKey="generadorApp.matMed.idTipoMatMed">Id Tipo Mat Med</Translate>
                          </Label>
                          <AvInput type="string" name="idTipoMatMed" id="mat-med-idTipoMatMed" value={this.state.idTipoMatMed} />
                          <UncontrolledTooltip target="idTipoMatMedLabel">
                            <Translate contentKey="generadorApp.matMed.help.idTipoMatMed" />
                          </UncontrolledTooltip>
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="valorLabel" for="mat-med-valor">
                            <Translate contentKey="generadorApp.matMed.valor">Valor</Translate>
                          </Label>

                          <AvInput type="text" name="valor" id="mat-med-valor" value={this.state.valor} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="mat-med-ativo">
                            <Translate contentKey="generadorApp.matMed.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="mat-med-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="mat-med-dataPost">
                            <Translate contentKey="generadorApp.matMed.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput type="date" name="dataPost" id="mat-med-dataPost" value={this.state.dataPost} />
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

              {matMedList && matMedList.length > 0 ? (
                <Table responsive aria-describedby="mat-med-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nome')}>
                        <Translate contentKey="generadorApp.matMed.nome">Nome</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idTipoMatMed')}>
                        <Translate contentKey="generadorApp.matMed.idTipoMatMed">Id Tipo Mat Med</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('valor')}>
                        <Translate contentKey="generadorApp.matMed.valor">Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.matMed.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.matMed.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {matMedList.map((matMed, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${matMed.id}`} color="link" size="sm">
                            {matMed.id}
                          </Button>
                        </td>

                        <td>{matMed.nome}</td>

                        <td>{matMed.idTipoMatMed}</td>

                        <td>{matMed.valor}</td>

                        <td>{matMed.ativo}</td>

                        <td>
                          <TextFormat type="date" value={matMed.dataPost} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${matMed.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${matMed.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${matMed.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.matMed.home.notFound">No Mat Meds found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={matMedList && matMedList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ matMed, ...storeState }: IRootState) => ({
  matMedList: matMed.entities,
  totalItems: matMed.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MatMed);
