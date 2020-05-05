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
import { getEntities } from './tipo-exame.reducer';
import { ITipoExame } from 'app/shared/model/tipo-exame.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITipoExameProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ITipoExameBaseState {
  exame: any;
  idPai: any;
  ativo: any;
}
export interface ITipoExameState extends ITipoExameBaseState, IPaginationBaseState {}

export class TipoExame extends React.Component<ITipoExameProps, ITipoExameState> {
  private myFormRef: any;

  constructor(props: ITipoExameProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getTipoExameState(this.props.location)
    };
  }

  getTipoExameState = (location): ITipoExameBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const exame = url.searchParams.get('exame') || '';
    const idPai = url.searchParams.get('idPai') || '';
    const ativo = url.searchParams.get('ativo') || '';

    return {
      exame,
      idPai,
      ativo
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        exame: '',
        idPai: '',
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
      'exame=' +
      this.state.exame +
      '&' +
      'idPai=' +
      this.state.idPai +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { exame, idPai, ativo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(exame, idPai, ativo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { tipoExameList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Tipo Exames</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Tipo Exames</span>
              <Button id="togglerFilterTipoExame" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.tipoExame.home.createLabel">Create a new Tipo Exame</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterTipoExame">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="exameLabel" for="tipo-exame-exame">
                            <Translate contentKey="generadorApp.tipoExame.exame">Exame</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="exame"
                            id="tipo-exame-exame"
                            value={this.state.exame}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idPaiLabel" for="tipo-exame-idPai">
                            <Translate contentKey="generadorApp.tipoExame.idPai">Id Pai</Translate>
                          </Label>
                          <AvInput type="string" name="idPai" id="tipo-exame-idPai" value={this.state.idPai} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="tipo-exame-ativo">
                            <Translate contentKey="generadorApp.tipoExame.ativo">Ativo</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="ativo"
                            id="tipo-exame-ativo"
                            value={this.state.ativo}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
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

              {tipoExameList && tipoExameList.length > 0 ? (
                <Table responsive aria-describedby="tipo-exame-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('exame')}>
                        <Translate contentKey="generadorApp.tipoExame.exame">Exame</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPai')}>
                        <Translate contentKey="generadorApp.tipoExame.idPai">Id Pai</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.tipoExame.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {tipoExameList.map((tipoExame, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${tipoExame.id}`} color="link" size="sm">
                            {tipoExame.id}
                          </Button>
                        </td>

                        <td>{tipoExame.exame}</td>

                        <td>{tipoExame.idPai}</td>

                        <td>{tipoExame.ativo}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${tipoExame.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${tipoExame.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${tipoExame.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.tipoExame.home.notFound">No Tipo Exames found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={tipoExameList && tipoExameList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ tipoExame, ...storeState }: IRootState) => ({
  tipoExameList: tipoExame.entities,
  totalItems: tipoExame.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoExame);